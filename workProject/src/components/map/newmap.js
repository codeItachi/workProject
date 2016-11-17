/**
 * Created by wuchuguang on 16-5-24.
 */

let mapImpl = {
    map:null,
    markers: new Map(),
    zoom: 18,
    marker_click: (marker) =>{},
    map_click: (position) =>{},
    map_move: (move) => {},
    init(container){
        this.map = new BMap.Map(container);
        this.map.enableScrollWheelZoom();
        this.map.disableDoubleClickZoom();
        this.map.addEventListener('click',({type, target, point, pixel, overlay})=>{
            this.map_click && this.map_click.call(this, point);
        });
        this.map.addEventListener('dragend', move=>{
            this.onMapMove(move);
        });
        this.map.addEventListener('zoomend', ()=>{
            this.onMapZoom();
        });
        mapImpl.debug && console.log('map init');
    },
    makePoint(position){
        if(position instanceof BMap.Point) return position;
        let point = new BMap.Point();
        point.lng = position.lng;
        point.lat = position.lat;
        return point;
    },
    led2marker(led){
        let position = {lng: led.lng || led.mapx || led.position && led.position.lng, lat: led.lat || led.mapy || led.position && led.position.lat};
        let png = led.images || 'static/led-icon/green.png';
        let marker = new BMap.Marker(this.makePoint(position),
            {icon: new BMap.Icon(png, new BMap.Size(38, 54), {
                offset: new BMap.Size(19, 54),//设置坐标偏移s
                imageOffset: new BMap.Size(0,0)// 设置图片偏移
            })});
        marker.id = led.id;
        marker.title = led.title;
        marker.position = position;
        marker.address = led.address;
        marker.type = led.type;
        marker.png = png;
        marker.overlay = false;
        marker.addEventListener("click", ()=>{
            this.marker_click && this.marker_click.call(this,marker);
        });
        return marker;
    },
    delMarker(id) {
        let marker = this.markers.get(id);
        if(marker){
            this.markers.delete(id);
            this.map.removeOverlay(marker);
        }
    },
    addMarker(marker){
        marker = this.led2marker(marker);
        let mid = marker.id;
        this.delMarker(mid);
        if(this.is_range(marker)){
            marker.overlay = true;
            this.setOverlay(marker);
        }
        this.setMarker(marker);
    },
    addMarkers(markers){
        markers.forEach((marker)=>{
            this.addMarker(marker);
        });
    },
    isPosition(position){
        if(position instanceof BMap.Point){
            return true;
        }
        if(position instanceof Object){
            if(position.mapx && position.mapy){
                return true;
            }
            if(position.lng && position.lat){
                return true;
            }
        }
        return false;
    },

    movePoint(position, zoom){
        mapImpl.debug && console.log('map move point');
        if(!this.isPosition(position)){
            return false;
        }
        let point = this.makePoint(position);
        this.map.centerAndZoom(point, zoom);
        this.zoom = zoom;
        this.onMapZoom();
        return true;
    },
    getBounds() {
        return this.map.getBounds();
    },
    getCenter(){
        return this.map.getCenter();
    },
    circle(index, radius, point){
        mapImpl.debug && console.log('map circle');
        let overlays = this.map.getOverlays();
        let len = overlays.length;
        for(let i = 0; i < len; i++){
            let overlay = overlays[i];
            if(overlay.index && overlay.index == index){
                this.map.removeOverlay(overlay);
                break;
            }
        }
        point = point || this.getCenter();
        let circle = new BMap.Circle(point, radius);
        circle.position = point;
        circle.setStrokeColor('#028dea');
        circle.setFillColor('#028dea');
        circle.setFillOpacity(0.1);
        circle.setStrokeWeight(1);
        circle.index = index;
        //添加多边形到地图上
        this.map.addOverlay(circle);
    },

    is_range(marker){
        if(this.getBounds().containsPoint(this.makePoint(marker.position))){
            return true;
        }else{
            return false;
        }
    },

    refresh_marker(){
        mapImpl.debug && console.log('map refresh_marker:' + this.markers.size);
        for (var [id, marker] of this.markers.entries()) {
            if(this.is_range(marker)){
                if(!marker.overlay){
                    marker.overlay = true;
                    this.setMarker(marker);
                    this.setOverlay(marker);
                }
            }else{
                this.delOverlay(marker);
                marker.overlay = false;
                this.setMarker(marker);
            }
        }
    },

    setOverlay(overlay){
        this.map.addOverlay(overlay);
    },

    delOverlay(overlay){
        this.map.removeOverlay(overlay);
    },

    setMarker(marker){
        this.markers.set(marker.id, marker);
    },

    onMapMove(move){//{type, target, pixel, point}
        mapImpl.debug && console.log('map mpa move doo..........');
        this.map_move && this.map_move.call(this, move);
        this.refresh_marker();
    },
    onMapZoom(){
        this.refresh_marker();
    },

    destory(){
        mapImpl.debug && console.log('map destory..');
        this.map = null;
        this.markers = new Map();
        this.zoom = 18;
        this.marker_click = (marker) =>{};
        this.map_click = (position) =>{};
        this.map_move = (move) => {};
    }
};

// mapImpl.debug = true;

export default mapImpl;
