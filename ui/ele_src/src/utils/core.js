/**
 * 发送通知消息
 *
 * @param tit 通知标题
 * @param msg 通知内容
 * @returns Promise<void>
 */
export async function notice(tit, msg) {
    Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
            var n = new Notification(tit, {
                body: msg,
                icon: process.env.VUE_APP_WAF_FLAG_ENTER+'=resource&resource=e.svg'
            });
        } else if (permission === 'denied') {
            console.log('帐户拒绝通知');
        }
    });
}