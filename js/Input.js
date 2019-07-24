let keys={
    up:false,
    down:false,
    right:false,
    left:false,
    keyW:false,
    keyA:false,
    keyS:false,
    keyD:false
};

class Input {
    update(){
        $(document).keydown((e) => {
            if (e.keyCode === 38) {
                keys.up = true;
            }
            if (e.keyCode === 40) {
                keys.down = true;
            }
            if (e.keyCode === 37) {
                keys.left = true;
            }
            if (e.keyCode === 39) {
                keys.right = true;
            }
            if (e.keyCode === 87) {
                keys.keyW = true;
            }
            if (e.keyCode === 65) {
                keys.keyA = true;
            }
            if (e.keyCode === 83) {
                keys.keyS = true;
            }
            if (e.keyCode === 68) {
                keys.keyD = true;
            }
        });
        $(document).keyup((e) => {
            if (e.keyCode === 38) {
                keys.up = false;
            }
            if (e.keyCode === 40) {
                keys.down = false;
            }
            if (e.keyCode === 37) {
                keys.left = false;
            }
            if (e.keyCode === 39) {
                keys.right = false;
            }
            if (e.keyCode === 87) {
                keys.keyW = false;
            }
            if (e.keyCode === 65) {
                keys.keyA = false;
            }
            if (e.keyCode === 83) {
                keys.keyS = false;
            }
            if (e.keyCode === 68) {
                keys.keyD = false;
            }
        });
    }
}