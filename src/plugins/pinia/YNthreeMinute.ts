import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const usethreeMinute = defineStore("threeMinute", () => {
  const typeList = ref([
    { label: "2D", id: 0, checked: true },
    { label: "3D", id: 1, checked: false },
    { label: "PL2", id: 2, checked: false },
    { label: "PL3", id: 3, checked: false },
  ]);
  const methodList2D = ref([
    { label: "头", id: 0, checked: false, sum: 1 },
    { label: "尾", id: 1, checked: false, sum: 1 },
    { label: "头尾", id: 2, checked: false, sum: 2 },
    { label: "包组", id: 3, checked: false, sum: 18 },
    { label: "包组7", id: 4, checked: false, sum: 7 },
  ]);
  const num2Data = () => {
    // 2D里的按键数据
    let arr = [];
    for (var i = 0; i < 100; i++) {
      i < 10 ? arr.push("0" + i) : arr.push("" + i);
    }
    return arr;
  };
  const methodList3D = ref([
    { label: "头", id: 0, checked: false, sum: 1 },
    { label: "尾", id: 1, checked: false, sum: 1 },
    { label: "头尾", id: 2, checked: false, sum: 2 },
    { label: "包组", id: 3, checked: false, sum: 18 },
    { label: "包组7", id: 4, checked: false, sum: 7 },
  ]);
  const num3Data = computed(() => {
    let arr = [];
    for (var i = 0; i < 1000; i++) {
      if (i < 10) {
        arr.push("00" + i);
      } else if (i < 100) {
        arr.push("0" + i);
      } else {
        arr.push("" + i);
      }
    }
    return arr;
  });

  const numPL2Data = computed(() => {
    let arr = [];
    for (var i = 0; i < 100; i++) {
      i < 10 ? arr.push("0" + i) : arr.push("" + i);
    }
    return arr;
  });

  const numPL3Data = computed(() => {
    let arr = [];
    for (var i = 0; i < 100; i++) {
      i < 10 ? arr.push("0" + i) : arr.push("" + i);
    }
    return arr;
  });
  const southCityList=computed(()=>{
    let cityList= 
      {
        name:"南部",
        city:[
            {gameId: '1', type: 1, code: 'vndTPHCM', name: '胡志明', vndArea: '南部',week:1,checked:false},
            {gameId: '3', type: 1, code: 'vndCaMau', name: '金瓯', vndArea: '南部',week:1,checked:false},
            {gameId: '5', type: 1, code: 'vndVungTau', name: '头顿', vndArea: '南部',week:2,checked:false},
            {gameId: '7', type: 1, code: 'vndBacLieu', name: '薄辽', vndArea: '南部',week:2,checked:false},
            {gameId: '6', type: 1, code: 'vndDongNai', name: '同奈', vndArea: '南部',week:3,checked:false},
            {gameId: '8', type: 1, code: 'vndCanTho', name: '芹苴', vndArea: '南部',week:3,checked:false},
            {gameId: '9', type: 1, code: 'vndSocTrang', name: '朔庄', vndArea: '南部',week:3,checked:false},
            {gameId: '10', type: 1, code: 'vndTayNinh', name: '西宁', vndArea: '南部',week:4,checked:false},
            {gameId: '11', type: 1, code: 'vndAnGiang', name: '安江', vndArea: '南部',week:4,checked:false},
            {gameId: '12', type: 1, code: 'vndBinhThuan', name: '平顺', vndArea: '南部',week:4,checked:false},
            {gameId: '13', type: 1, code: 'vndVinhLong', name: '永隆', vndArea: '南部',week:5,checked:false},
            {gameId: '14', type: 1, code: 'vndBinhDuong', name: '平阳', vndArea: '南部',week:5,checked:false},
            {gameId: '15', type: 1, code: 'vndTraVinh', name: '茶荣', vndArea: '南部',week:5,checked:false},
            {gameId: '1', type: 1, code: 'vndTPHCM', name: '胡志明', vndArea: '南部',week:6,checked:false},
            {gameId: '17', type: 1, code: 'vndBinhPhuoc', name: '平福', vndArea: '南部',week:6,checked:false},
            {gameId: '18', type: 1, code: 'vndHauGiang', name: '后江', vndArea: '南部',week:6,checked:false},
            {gameId: '19', type: 1, code: 'vndTienGiang', name: '前江', vndArea: '南部',week:7,checked:false},
            {gameId: '20', type: 1, code: 'vndKienGiang', name: '坚江', vndArea: '南部',week:7,checked:false},
            {gameId: '21', type: 1, code: 'vndDaLat', name: '大叻', vndArea: '南部',week:7,checked:false},
        ],
      }
    cityList=weekday.value.map(item=>{
      return {...item,city:cityList.city.filter(val=>val.week===item.weekDay)}})
    console.log(cityList)
    
    return cityList
  })
  const weekday=computed(()=>{
    // 计算一周的时间
    let dateArray = [];  
    // 获取今天的日期  
    let today = new Date();  
    let month = String(today.getMonth() + 1).padStart(2, '0'); // 获取月份，并确保是两位数  
    let todayDate = month + '-' + today.getDate();  
      let week=['日', '一', '二', '三', '四', '五', '六']
    // 获取星期几  
    let weekDay:any = String(today.getDay()).padStart(2, '0'); // 获取星期几，并确保是两位数  
      
    dateArray.push({  
        date: todayDate,  
        week: week[weekDay[1]], // 星期几显示为对应的汉字  
        weekDay:1*(weekDay[1])||7
    });  
      
    // 获取未来六天的日期  
    for (let i = 1; i <= 6; i++) {  
        let nextDay = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)); // 一天的毫秒数  
        month = String(nextDay.getMonth() + 1).padStart(2, '0'); // 获取月份，并确保是两位数  
        let nextDayDate = month + '-' + nextDay.getDate();  
          
        // 获取星期几  
        weekDay = String(nextDay.getDay()).padStart(2, '0'); // 获取星期几，并确保是两位数  
          
        dateArray.push({  
            date: nextDayDate,  
            week: week[weekDay[1]], // 星期几显示为对应的汉字  
            weekDay:1*(weekDay[1])||7
        });  
    }  
return dateArray
  })
  return { typeList, methodList2D,num2Data, methodList3D,num3Data,numPL2Data,numPL3Data,southCityList,weekday  };
});
