const greenStatus = '#008000';
const redStatus = '#FF0000';

function invokeMapLoader(mapUrlWithFilters) {
    const map = new maplibregl.Map({
        container: 'dvMapContainer',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=2HY31GbOIBe6x5E3fskA',
        center: [91.463963,26.2035268],
        zoom: 5
    });

    map.on('load', () => {
        map.resize();

        map.addSource('pressure_point_stats', {
            type: 'geojson',
            data: mapUrlWithFilters
            // data: 'https://nan-avanalla.github.io/GJB-dummy/pp_map_05May.json'
            // data: 'https://nan-avanalla.github.io/GJB-dummy/pp_map_30Apr.json'
            // data: 'https://nan-avanalla.github.io/GJB-dummy/pp_data_13Mar.json'
            // data: 'http://localhost:5180/api/ppdata/list'
        });
    
        map.addLayer({
            'id': 'nodes',
            'type': 'circle',
            'source': 'pressure_point_stats',
            paint: {
                'circle-color': ['get', 'PointStatusColor'],
                'circle-radius': 5
            },
            'filter': ['==', 'PointStatusColor', greenStatus]
        });
    
        map.addLayer({
            'id': 'tagheaders',
            'type': 'symbol',
            'source': 'pressure_point_stats',
            'layout': {
                'text-field': ['get', 'TagHeader'],
                'text-font': [
                    'Open Sans Semibold',
                    'Arial Unicode MS Bold'
                ],
                'text-offset': [0, 0.5],
                'text-anchor': 'top'
            },
            'textfit':'proportional'
        });
    
        //animated circle
        const size = 100;
        const pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
    
            // get rendering context for the map canvas when layer is added to the map
            onAdd () {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                this.context = canvas.getContext('2d');
            },
    
            // called once before every frame where the icon will be used
            render () {
                const duration = 1000;
                const t = (performance.now() % duration) / duration;
    
                const radius = (size / 2) * 0.3;
                const outerRadius = (size / 2) * 0.7 * t + radius;
                const context = this.context;
    
                // draw outer circle
                context.clearRect(0, 0, this.width, this.height);
                context.beginPath();
                context.arc(
                    this.width / 2,
                    this.height / 2,
                    outerRadius,
                    0,
                    Math.PI * 2
                );
                context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
                context.fill();
    
                // draw inner circle
                context.beginPath();
                context.arc(
                    this.width / 2,
                    this.height / 2,
                    radius,
                    0,
                    Math.PI * 2
                );
                context.fillStyle = 'rgba(255, 100, 100, 1)';
                context.strokeStyle = 'white';
                context.lineWidth = 2 + 4 * (1 - t);
                context.fill();
                context.stroke();
    
                // update this image's data with data from the canvas
                this.data = context.getImageData(
                    0,
                    0,
                    this.width,
                    this.height
                ).data;
    
                // continuously repaint the map, resulting in the smooth animation of the dot
                map.triggerRepaint();
    
                // return `true` to let the map know that the image was updated
                return true;
            }
        };
    
        map.addImage('pulsing-dot', pulsingDot, {pixelRatio: 2});
    
        map.addLayer({
            'id': 'dots',
            'type': 'symbol',
            'source': 'pressure_point_stats',
            'layout': {
                'icon-image': 'pulsing-dot',
                'text-field': ['get', 'TagHeader'],
                'text-font': [
                    'Open Sans Semibold',
                    'Arial Unicode MS Bold'
                ],
                'text-offset': [0, 0.5],
                'text-anchor': 'top'
            },
            'textfit':'proportional',
            'filter': ['==', 'PointStatusColor', redStatus]
        });
        //animated circle
    
        map.on('click', 'nodes', (e) => {
            var tagTable = '<table border="1">';
            tagTable += '<tr bgcolor="#00FF00"><th>Tag</th><th>Value</th></tr>';
            JSON.parse(e.features[0].properties.TagAttributes).Tags.forEach(tag => {
                tagTable += '<tr><td>' + tag.TagName + '</td><td>' + tag.Value + '</td></tr>';
            });
            tagTable += '</table>';


            new maplibregl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<b>' + e.features[0].properties.TagHeader + '</b>'+ tagTable)
                .addTo(map);
        });
    
        map.on('click', 'dots', (e) => {
            var tagTable = '<table border="1">';
            tagTable += '<tr bgcolor="#00FF00"><th>Tag</th><th>Value</th></tr>';
            JSON.parse(e.features[0].properties.TagAttributes).Tags.forEach(tag => {
                tagTable += '<tr><td>' + tag.TagName + '</td><td>' + tag.Value + '</td></tr>';
            });
            tagTable += '</table>';

            new maplibregl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<b>' + e.features[0].properties.TagHeader + '</b>'+ tagTable)
                .addTo(map);
        });
    
        map.on('mouseenter', 'nodes', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'nodes', () => {
            map.getCanvas().style.cursor = '';
        });
    
        map.on('click', 'nodes', async (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['nodes']
            });
            const zoom = await map.getZoom() + 1.5;
            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom
            });
        });
    
        map.on('click', 'dots', async (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['dots']
            });
            const zoom = await map.getZoom() + 1.5;
            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom
            });
        });
    });
}