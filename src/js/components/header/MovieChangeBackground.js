export default function movieChangeBackground(idElement) {
    const bgColor1 = {r:20,g:20,b:20, a:0}
    const bgColor2 = {r:20,g:20,b:20, a:1}
    
    window.onload = function(){
        window.dispatchEvent(new Event("scroll"));
    }
    
    window.addEventListener("scroll", function(){
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = 500;  
    const percent = scrollTop/scrollHeight;
    const color = {r:0,g:0,b:0, a:0};
    
    let tmp = Math.abs(bgColor1.r - bgColor2.r)*percent;
    color.r =  Math.ceil(bgColor1.r > bgColor2.r ? bgColor1.r - tmp: bgColor1.r + tmp);
    
     tmp = Math.abs(bgColor1.g - bgColor2.g)*percent;
    color.g =  Math.ceil(bgColor1.g > bgColor2.g ? bgColor1.g - tmp: bgColor1.g + tmp);
    
    tmp = Math.abs(bgColor1.b - bgColor2.b)*percent;
    color.b =  Math.ceil(bgColor1.b > bgColor2.b ? bgColor1.b - tmp: bgColor1.b + tmp);
    
    tmp = Math.abs(bgColor1.a - bgColor2.a)*percent;
    color.a =  Math.ceil(bgColor1.a > bgColor2.a ? bgColor1.a - tmp: bgColor1.a + tmp);
    
    document.getElementById(idElement).style.background = "rgb("+color.r+","+color.g+","+color.b+","+color.a+")";
    });
}