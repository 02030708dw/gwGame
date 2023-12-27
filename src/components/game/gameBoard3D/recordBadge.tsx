import {computed, defineComponent, PropType} from "vue";
import {Badge} from "vant";
export default defineComponent({
    name:'RecordBadge',
    props:{
      acData:{
          type:Number,
          required:true
      }
    },
    setup(props){
        return ()=>
            <>
                {
                    props.acData>0&&<Badge content={props.acData} max={99}/>
                }
            </>
    }
})