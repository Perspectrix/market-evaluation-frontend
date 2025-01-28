import dynamic from 'next/dynamic';
import { MapProps } from './types';
import {JSX} from "react";

// Dynamic import with type safety
const DynamicMap = dynamic<MapProps>(() => import('./DynamicMap'), {
    ssr: false
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Map: (props) => JSX.Element = (props) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;

    return (
        <div style={{ aspectRatio: `${width}/${height}` }}>
            <DynamicMap {...props} />
        </div>
    );
};

export default Map;