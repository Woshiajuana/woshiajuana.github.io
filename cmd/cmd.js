
import page          from './release.cmd'

const parameters = process.argv.splice(2);

const arr = [
    page,
];

(function fireFun(index) {
    arr[index] && arr[index](parameters).then(() => {
        return fireFun(++index);
    })
})(0);
