import {useEffect, useCallback, JSX} from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import styles from './Map.module.scss';
import PopupContent from './Popup';
import { MapProps, PopupData } from './types';

const { MapContainer, TileLayer } = ReactLeaflet;

const Map: ({children, className, width, height, ...rest}: {
    children: any;
    className: any;
    width: any;
    height: any;
    [p: string]: any
}) => JSX.Element = ({
                                     children,
                                     className,
                                     width,
                                     height,
                                     ...rest
                                 }) => {
    let mapClassName = styles.map;
    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }

    const handleCreated = useCallback(async (e: Leaflet.LeafletEvent) => {
        const layer = e.layer as Leaflet.Polygon;
        const coords = (layer.getLatLngs()[0] as Leaflet.LatLng[]).map((coord) => [coord.lat, coord.lng]);

        try {
            const response = await fetch('http://localhost:8080/api/find-in-polygon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coords),
            });

            if (!response.ok) {
                throw new Error('Failed to save coordinates');
            }

            const data: PopupData = await response.json();

            // Create a container for the popup
            const container = document.createElement('div');
            const root = createRoot(container);
            root.render(<PopupContent data={data} />);

            layer.bindPopup(container).openPopup();
        } catch (error) {
            console.error('Error saving coordinates:', error);
        }
    }, []);

    useEffect(() => {
        (async function init() {
            delete Leaflet.Icon.Default.prototype._getIconUrl;
            Leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png',
            });
        })();
    }, []);

    const DrawControl: React.FC<{ position: Leaflet.ControlPosition }> = ({ position }) => {
        const map = ReactLeaflet.useMap();

        useEffect(() => {
            const featureGroup = new Leaflet.FeatureGroup();

            const drawControl = new Leaflet.Control.Draw({
                position,
                draw: {
                    marker: false,
                    circlemarker: false,
                    circle: false,
                    polyline: false,
                    rectangle: true,
                    polygon: true,
                },
                edit: {
                    featureGroup,
                    remove: true,
                },
            });

            map.addLayer(featureGroup);
            map.addControl(drawControl);

            map.on(Leaflet.Draw.Event.CREATED, (e: Leaflet.LeafletEvent) => {
                featureGroup.addLayer(e.layer);
                handleCreated(e);
            });

            return () => {
                map.removeControl(drawControl);
                map.removeLayer(featureGroup);
            };
        }, [map]);

        return null;
    };

    // Default map content if no children provided
    const defaultMapContent = (reactLeaflet: typeof ReactLeaflet, leaflet: typeof Leaflet) => (
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
    );

    return (
        <MapContainer
            className={mapClassName}
            center={[51.505, -0.09]} // Default center
            zoom={13} // Default zoom
            {...rest}
        >
            <DrawControl position="topleft" />
            {children ? children(ReactLeaflet, Leaflet) : defaultMapContent(ReactLeaflet, Leaflet)}
        </MapContainer>
    );
};

export default Map;