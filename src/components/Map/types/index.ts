import { ReactNode } from 'react';
import * as ReactLeaflet from 'react-leaflet';
import * as Leaflet from 'leaflet';

export interface PopupData {
    'Sample Score'?: number;
    [key: string]: string | number | undefined;
}

export interface MapProps extends Omit<React.ComponentProps<typeof ReactLeaflet.MapContainer>, 'children'> {
    children?: (reactLeaflet: typeof ReactLeaflet, leaflet: typeof Leaflet) => ReactNode;
    className?: string;
    width?: number;
    height?: number;
}

export interface PopupContentProps {
    data: PopupData;
}

// Add this to handle Leaflet.Draw types if needed
declare module 'leaflet' {
    namespace Draw {
        namespace Event {
            const CREATED: 'draw:created';
            const EDITED: 'draw:edited';
            const DELETED: 'draw:deleted';
            const DRAWSTART: 'draw:drawstart';
            const DRAWSTOP: 'draw:drawstop';
            const DRAWVERTEX: 'draw:drawvertex';
            const EDITSTART: 'draw:editstart';
            const EDITMOVE: 'draw:editmove';
            const EDITRESIZE: 'draw:editresize';
            const EDITVERTEX: 'draw:editvertex';
            const EDITSTOP: 'draw:editstop';
            const DELETESTART: 'draw:deletestart';
            const DELETESTOP: 'draw:deletestop';
        }
    }
}