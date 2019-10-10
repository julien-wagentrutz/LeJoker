window.addEventListener('load', (event) => {

    document.querySelector('#loader').classList.add('hidden')
    setTimeout(function() {
        document.querySelector('#tuto').classList.add('hidden')
    }, 1000)



    let scroll = 0
    let scale = 1
    let etape = 0
    let pictures = document.querySelectorAll('#scene #jokerFace li')
    let percentScale = 0.05
    let speed = 0.1
    let opacity = 0
    let step = true
    let firstImg = document.querySelector('#firstImg')
    let back = document.querySelector('#background')
    let audioStart = new Audio('public/sound/start.mp3');
    let audioEnd = new Audio('public/sound/end.mp3');
    let audioBox = [ new Audio('public/sound/slap1.mp3')
        ,new Audio('public/sound/slap3.mp3')
        ,new Audio('public/sound/slap2.mp3')
        ,new Audio('public/sound/gun.mp3')
        ,new Audio('public/sound/crowd.mp3')
        ,new Audio('public/sound/Jokerlaugh1.mp3')
        //,new Audio('public/sound/Jokerlaugh2.mp3')
    ]
    audioStart.play()
    audioBox[0].volume = 1
    audioBox[1].volume = 1
    audioBox[2].volume = 1

    audioBox[3].volume = 0.2
    audioBox[4].volume = 0.2
    audioBox[5].volume = 1

    audioStart.volume = 0.5
    audioStart.loop = true;
    firstImg.style.opacity = 1

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        percentScale = 0.02
        speed = 0.1
    }

    let deg = 0
    let oriaDeg = true


    window.addEventListener('touchmove', function (e) {
        play(e.touches[0].pageY)
        ev.preventDefault();
    }, { passive: false })


    window.addEventListener('wheel', function (e) {
        play(e.deltaY)
    })

    function play(deltaY) {
        if(step)
        {

            if(deltaY > 0){



                etape += 1

                if(etape >= pictures.length)
                {
                    etape = pictures.length-1
                }

                if(etape ==  pictures.length-1)
                {
                    firstImg.style.opacity =  0
                }
                else
                {
                    firstImg.style.opacity =  1 -  (etape * 0.10)
                }

                if(pictures[etape].querySelector('img').classList.contains('hidden')) {
                    pictures[etape].querySelector('img').classList.remove('hidden')
                }




            }
            else
            {
                if(etape != 0)
                {
                    if(!pictures[etape].querySelector('img').classList.contains('hidden'))
                    {
                        pictures[etape].querySelector('img').classList.add('hidden')
                    }
                }

                etape -= 1

                if(etape < 0)
                {
                    etape = 0
                }
                if(etape == 4 )
                {
                    audioStart.play()
                }
                let opa = (parseFloat(firstImg.style.opacity) +  ((etape+1) * 0.10))
                firstImg.style.opacity =  opa




            }

            let bright = 1 - (etape * (1 / (pictures.length+2)))
            back.style.filter = 'brightness('+ bright +') drop-shadow(2px 4px 6px black)'
            back.style.transform = 'scale('+ (scale + (etape * 0.05)) +')'
            bright = 1 + (etape * 0.05)
            firstImg.style.filter = 'drop-shadow(2px 4px 6px black) brightness(' + bright  +')'

            for(let i = 0; i< pictures.length;i++)
            {
                pictures[i].querySelector('img').style.transform = 'scale('+ (1.5 + (etape * percentScale)) +')'

            }

            if(etape == 5)
            {
                audioStart.volume = 0.3
            }




            if(etape < 5)
            {
                audioBox[etape].play()
            }


            step = false


            setTimeout(function() {
                step = true
                if(etape == 4) {
                    audioBox[etape].pause()
                    document.querySelector('.discovery').classList.add('hidden')
                }

            }, 1000)

            if(etape == 5)
            {
                audioBox[etape].play()
                document.querySelector('.discovery').classList.remove('hidden')
            }
        }

    }

});

