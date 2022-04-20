declare module 'react-use-geolocation' {
    type Position = { coords: { latitude: number; longitude: number } }
    export function useCurrentPosition(): [
        Position | undefined,
        Error | undefined,
    ]
}