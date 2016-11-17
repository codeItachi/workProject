/**
 * Created by wuchuguang on 16-7-2.
 */

import promiseCmd from './promise_cmd';

const cmd_map_move = 21002;
const cmd_map_keyword = 21001;
const cmd_map_direction = 21003;
const cmd_map_position = 21004;

let map = {
    name: 'map',
    move(sw, ne){
        return promiseCmd(cmd_map_move, {sw:sw, ne:ne});
    },
    keyword(keyword){
        return promiseCmd(cmd_map_keyword, {word:keyword});
    },
    distance(position1, position2){
        return promiseCmd(cmd_map_direction, {pos1:position1,pos2:position2});
    },
    position2address(position){
        return promiseCmd(cmd_map_position, position);
    }
};

export default map;

