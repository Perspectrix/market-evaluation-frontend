import { useEffect, useCallback } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import styles from './Map.module.scss';

const { MapContainer, FeatureGroup } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {
    let mapClassName = styles.map;
    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }

    const handleCreated = useCallback(async (e) => {
        const layer = e.layer;
        const coords = layer.getLatLngs()[0].map(coord => [coord.lat, coord.lng]);

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
            const data = await response.json();

            console.log('Shape coordinates saved successfully');
            console.log(data)
            const popupContent = Object.entries(data)
                .sort(([keyA], [keyB]) => {
                    // Place 'Sample Score' at the top
                    if (keyA === 'Sample Score') return -1;  // 'Sample Score' comes first
                    if (keyB === 'Sample Score') return 1;   // 'Sample Score' comes first
                    return 0;  // Keep other entries in original order
                })
                .map(([key, value]) => {
                    // Format numbers with commas using toLocaleString
                    if (typeof value === 'number') {
                        value = value.toLocaleString();
                    }
                    return `${key}: ${value}`;
                })
                .join('<br />');


            const polygonCenter = layer.getBounds().getCenter(); // Get the center of the polygon
            layer.bindPopup(popupContent).openPopup();
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

    const DrawControl = ({ position }) => {
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

            map.on(Leaflet.Draw.Event.CREATED, (e) => {
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

    return (
        <MapContainer className={mapClassName} {...rest}>
            <DrawControl position="topleft" />
            {children(ReactLeaflet, Leaflet)}
        </MapContainer>
    );
};

export default Map;