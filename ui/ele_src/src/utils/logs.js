import req from "@/utils/request";
import {notice} from "@/utils/core";
import store from "@/store";
let  log_map={};
// let time_span=new Date().getTime();
let time_span;
export function request(opt) {
  opt.params.time_span=time_span;
  return new Promise(function (resolve, reject) {
    req(opt)
      .then((res) => {
        time_span=time_span||res.data.time_span;
        // console.log(time_span,res.data.total)
        if(res.data.total>0){
          let item=res.data.items[0];
          let index=item.index;
          // console.log(store.getters.config.browser_notice)
          if(store.getters.config.browser_notice){
            if(log_map[opt.params.type]!=index && log_map[opt.params.type] && opt.params.type==="under_attack_log"||opt.params.type==="flag_log"||opt.params.type==="flag_eye_to_eye"){
              // console.log(log_map,item)
              notice("发现一个攻击事件",item.log)
            }
          }
          log_map[opt.params.type]=index
        }
        time_span--;
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
