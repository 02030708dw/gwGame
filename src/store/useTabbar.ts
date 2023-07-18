import { defineStore } from "pinia";
 
export const useTabbar = defineStore('tabbar', {
    state() {
        return {
            tabbarValue: 0,
            userType:0
        }
    },
    /**
     * state是 当前模块
     * 
    */
    getters: {
        // doubleAge: (state) => state.age * 2,
        //  如果要在getter 中调用其他计算属性的方法
        // // 不能使用剪头函数
        // //this指向是什么 我们这种写法this是指向当前的store实例
        // //需要自定义当前的方法放回值类型
        // getNameAge(): string {
        //     return this.name + this.doubleAge
        // },
        // // 计算属性接收页面参数 num页面传过来的
        // getAdd() {
        //     return (num: number) => this.age + num
        // }
    },
    //当前模块的相关的业务逻辑

    actions: {
        getUserType(v:any){
            this.userType = v;
        }
    //  async   saveName(name: string) {
    //         await dely()
    //         this.name = name;
    //         console.log(" this.name", this.name)
    //     }
    },
    unistorage: true
})
