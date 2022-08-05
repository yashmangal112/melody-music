
console.log("hey yash");

let songIndex = 1;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('playbtn');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let upPlay = Array.from(document.getElementsByClassName('upPlaybtn'));
let playsongname = document.getElementById('playsongname');


let random = document.getElementById('random');
// let suffle = Array.from(document.getElementsByClassName('suffle'));

let songlistplay = Array.from(document.getElementsByClassName('songlistplay'));


let previous = document.getElementById('backward');
let next = document.getElementById('forward');


let songs = [
    {songName: "Khushi Ke Pal", audio:'song/1.mp3', cover: 'img/cover1.jpg', time:"04:04", title:"Khushi Ke Pal - Nandini Srikar"},
    {songName: "Chhod Diya Vo Rasta", audio:'song/2.mp3', cover: 'img/cover chhod diya.jpg', time:"05:19", title:"Chhod Diya - Arijit Singh" },
    {songName: "Bewafa Slowed & Reversed", audio:'song/3.mp3', cover: 'img/cover bewafa.jpg', time:"04:58", title:"Bewafa - Imran Khan" },
    {songName: "Let Me Down x Main Dhoondne", audio:'song/4.mp3', cover: 'img/cover let me down.jpg', time:"02:56", title:"Let Me Down x Main Dhoondne - Gravero" },
    {songName: "Ektarfa", audio:'song/5.mp3', cover: 'img/cover Ektarfa 3.jpg', time:"04:01", title:"Ektarfa - King"},
    {songName: "Zara Zara Behakta Hai", audio:'song/6.mp3', cover: 'img/cover zara zara.jpg', time:"03:58", title:"Zara Zara - Simran Sehgal"},
    {songName: "Naina Slowed And Reverb", audio:'song/7.mp3', cover: 'img/cover naina.jpg', time:"04:16", title:"Naina - Arijit Singh"},
    {songName: "Jeena Jeena Lofi", audio:'song/8.mp3', cover: 'img/cover jeena jeena.jpg', time:"04:12", title:"Jeena Jeena - Atif Aslam"},
]

songItem.forEach((element, i)=> {
    element.getElementsByTagName('img')[0].src = songs[i].cover;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('timestamp')[0].innerText = songs[i].time;
});


// audioElement.play();



masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.title="pause";
        masterPlay.src = "img/pause-button.png";
        // console.log();
        songlistplay[songIndex-1].getElementsByTagName('img')[0].src = "img/pause-button 2.png";
        gif.style.opacity = 1;
    }
    
    else{
        // console.log(audioElement.currentTime);
        audioElement.pause();
        masterPlay.title="play";    
        masterPlay.src = "img/circle-play-regular.svg";
        makePlay();
        gif.style.opacity = 0;
    }

})

const makerandom = (element)=>{
       
        element.addEventListener('click',()=>{

            element.src = "img/circle-play-regular.svg";
        })
        return;
}

random.addEventListener('click',(e)=>{
    if (e.target.src.match("img/repeat-once.png")) {
        e.target.src = "img/repeat.png";
    }
    else{
        e.target.src = "img/repeat-once.png";
    }
    
})




audioElement.addEventListener('timeupdate', ()=>{
    
    
    if (audioElement.currentTime == audioElement.duration) {
        if (random.src.match('img/repeat-once.png')) {
            audioElement.play();
        }
        else{

            if (songIndex>8) {
                songIndex = 0;
            }
            else if(songIndex == 8){
                songIndex = 1;
            }
            else{
                songIndex += 1;
            }
        
            console.log(songIndex);
            makePlay();
            songlistplay[songIndex-1].getElementsByTagName('img')[0].src = "img/pause-button 2.png";
            // songlistplay[songIndex-1].getElementsByTagName('img')[0].src = "img/circle-play-regular.svg";
            
            audioElement.src = `song/${songIndex}.mp3`;
            
            playsongname.innerText = songs[songIndex-1].title;
            audioElement.play();

        }
    }

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    myProgressBar.title = "seek";
    // console.log(progress);
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makePlay = ()=>{
    upPlay.forEach((element)=>{
        element.src = "img/circle-play-regular.svg";
    })
}
// let seekstop = progress;
upPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        
        if(e.target.src.match("img/circle-play-regular.svg")){
            
            makePlay();
            songIndex = parseInt(e.target.id);
            
            e.target.src = "img/pause-button.png";
            audioElement.src = `song/${songIndex}.mp3`;
            playsongname.innerText = songs[songIndex-1].title;
            audioElement.play();

            gif.style.opacity = 1;
            // console.log(parseInt((audioElement.currentTime/audioElement.duration)*100));
            // audioElement.currentTime = 0;
            masterPlay.src = "img/pause-button 2.png";

        }
        else{
            audioElement.pause();
            e.target.src = "img/circle-play-regular.svg";
            masterPlay.src = "img/circle-play-regular.svg";
            playsongname.innerText = songs[songIndex-1].title;
            gif.style.opacity = 0;
            // audioElement.currentTime = 0;

        }
        if (e.target.src.match("img/repeat-once.png")) {
            element.addEventListener('click',(e)=>{
                e.target.src = "img/pause-button 2.png";
                masterPlay.src = "img/pause-button 2.png";
                audioElement.src = `song/${songIndex}.mp3`;
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;
            })
        }
    })
})

// upPlay.forEach((element)=>{
//     element.addEventListener('click', (e)=>{
//         makePlay();
//         songIndex = parseInt(e.target.id);
//         // console.log(element);
//         console.log(e.target.src);
//         e.target.src = "img/pause-button 2.png";
//         audioElement.src = `song/${songIndex}.mp3`;
//         playsongname.innerText = songs[songIndex-1].title;
//         gif.style.opacity = 1;
//         audioElement.currentTime = 0;
//         audioElement.play();
//         masterPlay.src = "img/pause-button 2.png";
//         // console.log(e.target.src);



//         // if (e.target.src.match("img/pause-button 2.png")) {

//         //     console.log(e.target.src);
//         //     e.target.src = "img/circle-play-regular.svg";
//         //     masterPlay.src = "img/circle-play-regular.svg";
//         //     audioElement.pause();
//         //     gif.style.opacity = 0;
//         //     audioElement.duration = 0;
            
//         // }
//         // if (e.target.src.match("img/circle-play-regular.svg")) {
//         //     e.target.src = "img/pause-button 2.png";
//         //     masterPlay.src = "img/pause-button 2.png";
//         //     audioElement.play();
//         //     gif.style.opacity = 1;
//         //     audioElement.duration = 0;
//         // }



//         if (e.target.src.match("img/repeat-once.png")) {
//             element.addEventListener('click',(e)=>{
//                 console.log(songIndex);
//                 console.log(e.target.src);
//                 e.target.src = "img/pause-button 2.png";
//                 masterPlay.src = "img/pause-button 2.png";
//                 audioElement.src = `song/${songIndex}.mp3`;
//                 audioElement.currentTime = 0;
//                 audioElement.play();
//                 gif.style.opacity = 1;
//             })
//         }
//     })
 
// });    


next.addEventListener('click',()=>{
    makePlay();
    if (songIndex>8) {
        songIndex = 0;
    }
    else if(songIndex == 8){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }

    songlistplay[songIndex-1].getElementsByTagName('img')[0].src = "img/pause-button 2.png";
    
    audioElement.src = `song/${songIndex}.mp3`;
    
    playsongname.innerText = songs[songIndex-1].title;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = "img/pause-button 2.png";
    
})
previous.addEventListener('click',()=>{
    makePlay();
    if (songIndex<1) {
        songIndex = 0;
    }
    else if(songIndex == 1){
        songIndex = 8;
    }
    else{
        songIndex -= 1;
    }
    songlistplay[songIndex-1].getElementsByTagName('img')[0].src = "img/pause-button 2.png";

    audioElement.src = `song/${songIndex}.mp3`;

    playsongname.innerText = songs[songIndex-1].title;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = "img/pause-button 2.png";
})
