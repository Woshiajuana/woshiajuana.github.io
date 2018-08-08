/**
 * Created by Administrator on 2017/5/15.
 */
export default {
    install ( Vue, options ) {
        Vue.prototype.$message = function ( options ) {
            if ( !options || typeof options.msg == 'undefined') return;
            if( window.document.getElementsByClassName('message-div')[0] ) return;
            var time = options.time || 3000,
                divEle = document.createElement('div'),
                str = `<span class="message-icon">${ options.msg }</span>`;
            divEle.className = 'message-div';
            divEle.innerHTML = str;
            document.body.appendChild(divEle);
            this.$nextTick(() => {
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
            });
            setTimeout(() => {
                document.body.removeChild(divEle)
            },time);
        }
        Vue.$message = function ( options ) {
            if ( !options || typeof options.msg == 'undefined') return;
            if( window.document.getElementsByClassName('message-div')[0] ) return;
            var time = options.time || 3000,
                divEle = document.createElement('div'),
                str = `<span class="message-icon">${ options.msg }</span>`;
            divEle.className = 'message-div';
            divEle.innerHTML = str;
            document.body.appendChild(divEle);
            Vue.nextTick(() => {
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
                divEle.style.marginLeft = '-' + divEle.clientWidth / 2 + 'px';
            });
            setTimeout(() => {
                document.body.removeChild(divEle)
            },time);
        }
    }
}
