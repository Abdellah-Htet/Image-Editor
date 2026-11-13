//ربط العناصر ديال HTML بـ JavaScript

let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");

let reset = document.querySelector('span');
let imgBox = document.querySelector('.img-box');

let invert = document.getElementById("invert");
let opacity = document.getElementById("opacity");


const canvas = document.getElementById("canvas");   //canvas هو بلاصة فين كنرسمو الصورة
const ctx = canvas.getContext('2d')   //ctx هو الأداة اللي كنخدمو بها الرسم


//هاد الفنكسيون كترجع كلشي للحالة الأصلية

 //تحيد الفلاتر
//ترجع sliders كيفما كانو

function resetValue(){
    img.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
   invert.value = '0';
    opacity.value = '1';
    
}

//ملي الصفحة كتتحل
window.onload = function(){
    download.style.display = 'none' ;   // زر download مخبي 
    reset.style.display = 'none' ;   //   زر reset مخبي 
    imgBox.style.display = 'none' ;   //   الصورة مخبية 
}

upload.onchange = function(){    //ملي تختار صورة:
    resetValue();                
    download.style.display = 'block' ;  //كيبانوا العناصر
    reset.style.display ='block' ;
    imgBox.style.display = 'block' ;

    let file = new FileReader();       //FileReader كيقرا الصورة ويحولها لـ base64
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){         //كيعرض الصورة
        img.src = file.result;
    }

    img.onload = function(){
        canvas.width = img.width;  //كنحدد الحجم ديال canvas
        canvas.height = img.height;   
        ctx.drawImage(img,0,0,canvas.width,canvas.height);  //كنرسم الصورة فيه
        img.style.display = 'none';   //كنخبي <img> حيث خدامين غير بـ canvas
    }

}

let filters = document.querySelectorAll("ul li input");  //🔹 كنجيب جميع sliders
filters.forEach( filter => {
    filter.addEventListener('input',function(){ //ملي تبدل شي slider  ونطبقوهم على canvas
         // كنطبقو الفلاتر
        ctx.filter = `                    
         saturate(${saturate.value}%)
         contrast(${contrast.value}%)
         brightness(${brightness.value}%)
         sepia(${sepia.value}%)
         grayscale(${grayscale.value})
         blur(${blur.value}px)
         hue-rotate(${hueRotate.value}deg)
          invert(${invert.value})
         opacity(${opacity.value}) 
        `

        ctx.drawImage(img,0,0,canvas.width,canvas.height);   //كنعاودو نرسمو الصورة
    })
} )

download.onclick = function(){
    download.href = canvas.toDataURL();  //كنحوّلو الصورة من canvas → صورة (base64)   وكنحطوها فـ href   باش تتحمل ملي تكليكي

                                       
}
