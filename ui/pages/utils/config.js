const imgList = [
    "http://qukufile2.qianqian.com/data2/pic/6a6489bd9627769702ac6c9a056b7446/556061188/556061188.jpg"
];

const songLinkList = [
    "https://nav.ailuoku6.top/yasugs.mp3"
];

const randomImg = ()=>{
    return imgList[Math.floor(Math.random()*imgList.length)];
};

export const randomLink = ()=>{
    return songLinkList[Math.floor(Math.random()*songLinkList.length)];
};

export default randomImg;
