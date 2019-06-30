import { h, Component } from "preact";
import Helmet from "preact-helmet";

import * as timeago from "timeago.js";
import lozad from "lozad";

const responsiveImage = require("../../img/four.jpg?min=320,max=1400,steps=6");
const five = require("../../img/Cristina-Hoch-Photography.jpg?min=320,max=1400,steps=6");

export default class Home extends Component {
  componentDidMount() {
    lozad(".lazy", {
      loaded: function (el) {
        // Custom implementation on a loaded element
        el.classList.add("is-loaded");
      },
      rootMargin: "10px 0px", // syntax similar to that of CSS Margin
      threshold: 0.4 // ratio of element convergence
    }).observe();

    //Fixed change to opacity on scroll
    window.addEventListener("scroll", this.handleOpacity);
    //Parallax on scroll event
    window.addEventListener('scroll', this.handleParallax);

    document.getElementById("intro").play();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOpacity);
    window.removeEventListener('scroll', this.handleParallax);
    document.getElementById("intro").pause();
  }

  handleParallax = () => {
    const target = document.querySelectorAll('[data-rate]');
    target.forEach(function (element) {
      let pos = window.pageYOffset * element.dataset.rate;
      element.style.transform = 'translate(0, ' + pos + 'px)';
    });
  }


  handleOpacity = () => {
    const target = document.querySelectorAll('[data-opacity]')
    target.forEach(function (element) {
      let pos = parseInt(element.dataset.opacity);
      element.style.opacity = 1 - Math.max(0, window.pageYOffset / pos);
    })
  };

  render() {
    return (
      <main>
        <Helmet title="My Title Hay James" />

        <header class="video-header">
          <video id="intro" src={require("../../video/intro.mp4")} autoplay loop playsinline muted></video>
          <div class="viewport-header viewport-header__transform">
            <svg version='1' xmlns='http://www.w3.org/2000/svg' width='680' height='701.333'
              viewBox='0 0 510.000000 526.000000' preserveAspectRatio='none'>
              <path d='M0 2630 l0 -2630 2550 0 2550 0 0 2630 0 2630 -277 0 -278 0 -138 -468 -138 -467 1 -212 0 -213 70 0 70 0 0 -215 c0 -118 2 -215 5 -215 2 0 28 18 57 40 71 54 135 74 233 74 146 0 248 -52 297 -152 l23 -47 0 -575 c0 -515 -2 -581 -17 -630 -67 -215 -366 -275 -550 -110 l-43 38 -15 -51 -16 -52 -222 -3 -222 -2 0 815 0 815 -65 0 -65 0 0 341 0 341 -137 474 -136 474 -29 0 -29 0 8 -47 c4 -27 8 -124 8 -218 0 -137 -4 -180 -18 -221 -27 -77 -89 -126 -176 -140 -40 -6 -57 -24 -23 -24 33 0 117 -47 149 -84 71 -79 68 -59 71 -498 l3 -398 -105 0 -106 0 0 -87 0 -87 37 36 c21 21 65 49 98 64 50 23 74 28 145 28 150 1 249 -47 303 -148 22 -41 22 -44 22 -631 0 -664 2 -645 -77 -731 -58 -63 -142 -97 -243 -97 -70 -1 -89 3 -145 30 -36 16 -82 47 -102 67 -20 20 -39 36 -41 36 -2 0 -10 -25 -17 -55 l-13 -55 -224 0 -223 0 0 815 0 815 -439 0 -438 0 -6 58 c-4 31 -10 108 -13 170 l-7 112 -88 0 c-49 0 -89 -1 -89 -2 0 -2 -7 -75 -15 -163 -8 -88 -15 -163 -15 -167 0 -5 -25 -8 -56 -8 l-55 0 3 -52 3 -53 63 -3 62 -3 0 -112 1 -112 27 54 c95 190 359 280 644 220 136 -29 264 -121 319 -231 45 -89 60 -180 66 -395 l6 -193 -313 0 -313 0 5 -217 c4 -150 9 -227 18 -246 25 -52 98 -48 127 6 13 25 18 66 21 195 l4 162 226 0 225 0 -6 -147 c-7 -175 -22 -232 -83 -325 -96 -144 -222 -201 -449 -201 -222 -1 -383 67 -471 197 l-34 51 0 -113 0 -112 -142 0 c-308 0 -399 32 -455 155 -16 37 -18 85 -21 578 l-3 537 -34 0 -35 0 0 -105 0 -105 -209 0 -209 0 -4 111 c-3 121 -12 139 -69 139 -50 0 -72 -30 -77 -103 -8 -130 20 -163 245 -281 181 -94 272 -159 307 -219 64 -109 73 -339 19 -502 -31 -95 -136 -175 -276 -212 -83 -22 -288 -21 -380 1 -44 10 -113 16 -191 16 l-124 0 -6 168 c-3 92 -9 213 -12 270 l-6 102 211 0 211 0 0 -92 c1 -103 11 -163 33 -185 20 -20 93 -21 114 -1 22 23 30 158 11 212 -12 36 -25 46 -153 122 -310 182 -364 225 -406 330 -21 52 -23 75 -24 204 0 182 15 240 82 311 68 72 163 112 328 135 l50 7 -44 8 c-76 14 -187 74 -245 131 -60 61 -108 153 -126 243 -30 149 -22 1112 9 1248 l9 37 -59 0 -59 0 0 -2630z m1540 -711 c60 -26 124 -91 147 -149 16 -41 18 -102 21 -727 l3 -683 -236 0 -235 0 0 613 c0 600 -3 670 -32 689 -24 14 -65 8 -84 -13 -18 -20 -19 -48 -22 -655 l-2 -634 -240 0 -240 0 0 780 0 780 240 0 240 0 0 -65 0 -64 47 50 c26 28 61 58 78 67 86 45 224 50 315 11z m602 20 c69 -15 120 -41 173 -91 l44 -40 16 56 16 56 220 0 220 0 -3 -767 -3 -768 -27 -51 c-85 -161 -255 -236 -538 -237 -345 -1 -483 87 -515 326 l-6 47 228 0 229 0 14 -42 c17 -47 48 -66 93 -54 43 10 55 41 63 159 4 59 4 107 1 107 -3 0 -28 -16 -57 -35 -66 -44 -136 -65 -221 -65 -142 0 -263 66 -307 167 -37 86 -44 196 -40 595 4 355 5 376 27 442 52 158 195 233 373 195z m1401 -15 c138 -36 237 -107 279 -202 17 -37 22 -74 26 -174 l5 -128 -212 0 -211 0 0 83 c0 88 -12 146 -32 159 -26 16 -69 8 -94 -18 -25 -24 -26 -30 -22 -111 l3 -85 47 -43 c26 -23 106 -73 178 -110 296 -153 348 -208 370 -395 11 -98 -3 -261 -29 -331 -12 -31 -37 -74 -55 -95 -88 -103 -295 -158 -502 -134 -121 13 -209 42 -282 90 -106 71 -140 151 -149 353 l-6 127 210 0 211 0 4 -122 c4 -131 15 -164 55 -174 29 -8 67 2 87 21 39 40 29 218 -16 255 -12 10 -104 65 -203 122 -209 120 -299 197 -330 283 -23 66 -32 264 -16 356 29 162 144 255 356 289 80 12 252 4 328 -16z m-2973 -784 l0 -780 -245 0 -245 0 0 780 0 780 245 0 245 0 0 -780z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M2249 1651 l-24 -19 -3 -379 c-2 -424 -2 -426 60 -431 31 -3 40 1 55 24 17 26 18 58 18 405 0 357 -1 378 -19 398 -24 26 -57 27 -87 2z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M1207 5203 c8 -32 17 -129 20 -215 l6 -158 -245 0 -245 0 -6 180 c-6 196 -13 224 -63 236 -40 10 -71 -10 -83 -53 -16 -56 -14 -1177 2 -1223 23 -66 95 -73 134 -13 15 23 18 54 21 215 l4 188 -51 0 -51 0 0 145 0 145 290 0 290 0 1 -332 1 -333 84 620 c46 341 83 628 84 638 0 15 -11 17 -104 17 l-103 0 14 -57z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M2291 4608 c54 -359 100 -664 102 -678 2 -14 5 280 6 653 l1 677 -103 0 -103 0 97 -652z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M3970 5250 c0 -5 11 -78 24 -162 14 -84 28 -180 32 -213 4 -33 9 -55 10 -50 2 6 17 91 34 190 17 99 34 195 37 213 l6 32 -72 0 c-39 0 -71 -4 -71 -10z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M2894 5196 c-2 -6 -3 -101 -2 -211 l3 -200 35 3 c55 5 87 21 100 52 7 18 10 77 8 169 -3 129 -5 142 -25 162 -25 25 -112 43 -119 25z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M1810 5062 c0 -6 -14 -118 -31 -249 -36 -279 -57 -491 -50 -498 2 -3 40 -5 84 -5 l79 0 -6 43 c-8 57 -32 303 -52 527 -9 102 -18 187 -20 189 -2 2 -4 -1 -4 -7z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M2895 4478 c-3 -7 -4 -139 -3 -293 l3 -280 73 -3 73 -3 -3 265 -3 266 -25 24 c-30 29 -107 45 -115 24z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M815 3694 c-50 -51 -72 -65 -120 -79 -33 -10 -67 -20 -75 -23 -8 -3 14 -9 50 -13 131 -17 241 -68 309 -145 l41 -47 0 67 0 66 50 0 50 0 0 55 0 54 -102 3 -101 3 -21 60 -21 60 -60 -61z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M2195 3296 c-21 -15 -34 -97 -34 -218 l-1 -68 70 0 70 0 0 114 c0 112 -9 163 -33 178 -19 12 -51 9 -72 -6z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M3314 3296 c-18 -14 -19 -31 -19 -511 l0 -497 24 -19 c45 -36 87 -17 101 46 12 52 12 878 0 930 -14 61 -61 83 -106 51z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M4441 3291 c-29 -29 -33 -116 -29 -571 4 -436 6 -454 55 -467 35 -8 71 12 80 44 10 36 10 919 0 955 -15 57 -69 76 -106 39z'
                transform='matrix(.1 0 0 -.1 0 526)' />
              <path d='M1592 2780 c2 -361 6 -492 15 -501 10 -10 113 -33 120 -26 1 2 -5 25 -14 52 -23 70 -31 769 -10 888 l13 77 -64 0 -64 0 4 -490z'
                transform='matrix(.1 0 0 -.1 0 526)' />
            </svg>
            <div class="splash__overlay">
              <div data-opacity="100" class="hero">


                <svg version="1" id="Layer_1" viewBox="0 0 978 120">
                  <g>
                    <path class="st0"
                      d="M306 50c-7 0-14 5-14 15s7 14 14 14 14-5 14-14-7-15-14-15zM462 69h12l-6-17zM159 50h-7v12h7c4 0 6-2 6-6 0-3-2-6-6-6zM18 50h-7v13h7c4 0 7-3 7-7 0-3-3-6-7-6z">
                    </path>
                    <path class="st1" d="M688 68h-7v11h7c4 0 6-2 6-5 0-4-2-6-6-6z"></path>
                    <path class="st1"
                      d="M625 3v119h351V3H625zm64 84h-17V43h16c9 0 14 5 14 12 0 4-3 8-7 9 4 1 8 5 8 10 0 7-5 13-14 13zm82-36h-19v10h17v7h-17v10h19v9h-27V43h27v8zm57 36c-12 0-17-7-18-13l8-2c1 4 4 8 10 8 4 0 7-2 7-6 0-2-2-4-5-5l-7-1c-7-1-11-6-11-13s7-13 15-13c11 0 15 6 16 11l-8 2c0-2-2-6-8-6-4 0-7 3-7 6 0 2 2 4 5 5l6 1c8 2 13 7 13 13 0 7-6 13-16 13zm89-36h-14v36h-9V51h-14v-8h37v8zm13 36c-3 0-5-3-5-6s2-5 5-5c4 0 6 2 6 5s-2 6-6 6z">
                    </path>
                    <path class="st1"
                      d="M693 55c0-3-2-5-6-5h-6v11h6c4 0 6-2 6-6zM19 43H3v44h8V70h8c9 0 14-6 14-14s-5-13-14-13zm-1 20h-7V50h7c4 0 7 3 7 6 0 4-3 7-7 7zM73 87h28v-9H82V68h17v-7H82V51h19v-8H73zM174 56c0-7-5-13-14-13h-17v44h9V70h4l9 17h9l-9-18c6-2 9-7 9-13zm-15 6h-7V50h7c4 0 6 3 6 6 0 4-2 6-6 6zM233 61l-6-1c-3-1-5-3-5-5 0-3 3-6 7-6 6 0 8 4 8 6l8-2c-1-5-5-11-16-11-8 0-15 6-15 13s4 12 11 13l6 1c4 1 6 3 6 5 0 4-3 6-7 6-7 0-10-4-10-8l-8 2c1 6 6 13 18 13 10 0 15-6 15-13 0-6-4-11-12-13zM306 42c-12 0-22 8-22 23 0 14 10 22 22 22s23-8 23-22c0-15-11-23-23-23zm0 37c-7 0-14-5-14-14s7-15 14-15 14 5 14 15-7 14-14 14zM399 72l-19-29h-10v44h8V55l20 32h9V43h-8zM463 43l-17 44h9l4-10h18l4 10h9l-17-44h-10zm-1 26l6-17 6 17h-12zM538 43h-9v44h28v-9h-19zM581 76c-3 0-6 2-6 5s3 6 6 6 6-3 6-6-3-5-6-5z">
                    </path>

                  </g>
                </svg>

                <h1 id="lead">Dedicated, passionate, intelligent: welcome to bespoke personal
                        training.</h1>
              </div>
            </div>

            <div data-opacity="100" class="masthead-arrow"></div>
          </div>

        </header>
        <article>
          <svg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 766.000000 768.000000'>
            <g fill='red'>
              <path d='M2087 6933 c-38 -24 -67 -47 -65 -51 2 -4 45 -90 95 -192 180 -367 282 -703 314 -1040 20 -217 -2 -475 -56 -637 -34 -99 -142 -321 -273 -561 -229 -415 -349 -729 -431 -1122 -75 -363 -84 -712 -25 -1016 21 -108 23 -110 71 -97 21 7 57 16 79 22 l41 11 -13 58 c-59 247 -57 609 4 927 l18 90 60 -2 c73 -3 394 -61 559 -101 612 -150 1036 -397 1219 -709 20 -35 39 -63 41 -63 2 0 20 8 40 17 33 16 37 16 72 -1 29 -14 38 -15 44 -4 5 7 26 42 46 78 54 93 206 242 334 327 225 149 542 277 900 362 128 30 488 95 591 105 65 7 59 16 83 -114 58 -315 59 -669 1 -912 l-13 -58 41 -11 c22 -6 58 -15 79 -22 48 -13 50 -11 71 97 27 141 36 246 36 421 1 312 -44 592 -145 920 -95 305 -171 479 -375 850 -182 331 -255 502 -285 670 -77 438 28 970 303 1525 47 96 86 179 87 184 0 5 -30 29 -68 53 l-67 43 -20 -32 c-80 -130 -212 -422 -273 -609 -120 -359 -165 -633 -154 -944 9 -270 50 -433 168 -667 22 -44 39 -81 37 -83 -9 -8 -96 -48 -193 -90 -687 -294 -1360 -351 -2060 -175 -222 56 -615 209 -615 240 0 6 20 51 45 100 77 152 113 253 142 386 25 120 27 146 27 364 0 198 -3 255 -22 364 -43 250 -118 503 -219 741 -57 135 -175 372 -196 391 -9 9 -29 1 -80 -33z m3265 -2465 c46 -71 208 -390 258 -506 56 -134 150 -406 150 -436 0 -9 -12 -17 -32 -20 -958 -133 -1594 -398 -1887 -788 l-43 -57 -44 58 c-67 89 -202 212 -321 291 -325 218 -760 367 -1343 462 -107 17 -196 32 -197 33 -11 5 101 325 166 479 46 105 221 448 241 469 4 5 18 2 31 -7 96 -62 498 -205 719 -255 277 -62 395 -75 720 -75 255 0 315 2 445 22 348 52 734 167 1020 307 50 24 93 44 96 44 4 1 13 -9 21 -21z'
                transform='matrix(.1 0 0 -.1 0 768)' />
              <path d='M3753 4890 c-70 -16 -87 -67 -31 -96 47 -24 145 -15 170 16 22 27 20 38 -13 61 -30 21 -84 29 -126 19z'
                transform='matrix(.1 0 0 -.1 0 768)' />
              <path d='M2755 1587 c-145 -48 -230 -142 -270 -298 -13 -50 -16 -97 -13 -214 l3 -150 42 -86 c80 -163 197 -229 389 -217 170 11 315 135 332 284 l5 44 -96 0 -95 0 -7 -32 c-19 -88 -85 -137 -183 -138 -95 0 -147 43 -182 154 -8 24 -12 94 -12 180 0 118 4 150 21 197 34 90 88 129 179 129 96 -1 162 -54 177 -142 l7 -38 94 0 94 0 0 33 c-1 45 -40 137 -81 186 -22 27 -60 55 -108 78 -66 34 -82 37 -165 40 -56 2 -106 -2 -131 -10z'
                transform='matrix(.1 0 0 -.1 0 768)' />
              <path d='M4403 1349 c-18 -5 -49 -25 -68 -45 l-35 -35 0 36 0 35 -90 0 -90 0 0 -355 0 -355 95 0 95 0 0 238 c0 234 0 239 23 260 32 30 70 42 133 42 l54 0 0 89 c0 84 -1 89 -22 95 -30 8 -56 6 -95 -5z'
                transform='matrix(.1 0 0 -.1 0 768)' />
              <path d='M3547 1336 c-91 -33 -154 -98 -193 -201 -14 -38 -19 -76 -19 -155 0 -92 3 -112 26 -160 37 -78 84 -129 152 -161 196 -92 414 0 473 200 24 81 16 241 -16 306 -35 72 -87 124 -155 157 -52 24 -72 28 -145 28 -47 -1 -102 -7 -123 -14z m213 -174 c29 -29 40 -50 50 -97 22 -107 -8 -233 -64 -270 -42 -28 -105 -30 -144 -5 -99 61 -109 298 -17 379 30 26 44 31 87 31 45 0 54 -4 88 -38z'
                transform='matrix(.1 0 0 -.1 0 768)' />
              <path d='M4787 1336 c-136 -50 -205 -157 -214 -332 -9 -154 34 -250 147 -326 95 -63 228 -75 351 -29 51 19 133 85 127 101 -2 4 -22 28 -45 54 l-43 45 -26 -24 c-62 -57 -184 -71 -244 -27 -35 26 -70 80 -70 108 l0 24 221 0 221 0 -4 98 c-3 77 -9 108 -30 153 -29 65 -78 117 -134 144 -51 25 -202 31 -257 11z m182 -151 c32 -16 64 -75 59 -108 -3 -21 -8 -22 -130 -25 -125 -3 -128 -2 -128 19 0 36 32 90 64 110 37 23 96 24 135 4z'
                transform='matrix(.1 0 0 -.1 0 768)' />
            </g>
          </svg>
          <svg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 765.000000 764.000000'>
            <g fill='red'>
              <path d='M3406 6848 c-13 -18 -16 -56 -16 -205 l0 -183 -257 0 c-142 0 -288 -5 -325 -10 -134 -19 -240 -97 -296 -218 l-27 -57 -3 -2005 c-2 -1879 -1 -2006 15 -2017 13 -10 298 -13 1344 -13 1197 0 1329 2 1343 16 15 14 16 204 14 2017 l-3 2002 -29 62 c-52 113 -164 194 -293 213 -37 5 -186 10 -330 10 l-263 0 0 188 c0 170 -2 191 -18 205 -17 15 -61 17 -430 17 l-411 0 -15 -22z m1546 -511 c64 -32 111 -80 142 -146 l21 -46 3 -1957 2 -1958 -1280 0 -1280 0 2 1958 3 1957 21 45 c42 90 117 152 205 169 24 5 508 8 1074 8 l1030 -2 57 -28z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M2682 5444 c-22 -15 -22 -16 -22 -338 0 -262 3 -326 14 -342 14 -19 37 -19 1159 -19 955 0 1147 2 1160 14 15 12 17 49 17 342 0 327 0 328 -22 343 -20 14 -146 16 -1153 16 -1007 0 -1133 -2 -1153 -16z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M2700 4639 c-13 -6 -28 -15 -32 -22 -4 -7 -8 -154 -8 -328 0 -257 3 -319 14 -335 14 -19 37 -19 1159 -19 955 0 1147 2 1160 14 15 12 17 49 17 341 0 292 -2 329 -17 341 -13 12 -205 14 -1142 16 -729 1 -1135 -2 -1151 -8z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M2710 3833 c-8 -3 -23 -12 -32 -21 -16 -14 -18 -43 -18 -332 0 -309 0 -317 21 -336 20 -18 54 -19 1161 -19 l1140 0 19 24 c18 22 19 43 19 331 0 288 -1 309 -19 331 l-19 24 -1129 2 c-620 1 -1135 -1 -1143 -4z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M2700 3019 c-13 -6 -28 -15 -32 -22 -4 -7 -8 -154 -8 -328 0 -257 3 -319 14 -335 14 -19 37 -19 1159 -19 955 0 1147 2 1160 14 15 12 17 49 17 341 0 292 -2 329 -17 341 -13 12 -205 14 -1142 16 -729 1 -1135 -2 -1151 -8z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M2680 1418 l0 -181 -22 20 c-43 39 -85 53 -154 53 -114 0 -188 -51 -243 -169 -24 -52 -26 -67 -26 -191 0 -125 2 -139 27 -192 58 -124 130 -178 238 -178 59 0 143 32 170 65 14 17 15 16 20 -16 l5 -34 88 -3 87 -3 0 506 0 505 -95 0 -95 0 0 -182z m-28 -297 c28 -31 28 -32 28 -174 0 -156 -5 -174 -60 -202 -71 -37 -140 -9 -177 72 -23 49 -25 64 -21 146 5 105 22 147 71 178 49 31 122 22 159 -20z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M760 1070 l0 -480 320 0 320 0 0 80 0 80 -220 0 -220 0 0 130 0 130 190 0 190 0 0 75 0 75 -190 0 -190 0 0 115 0 115 220 0 220 0 0 80 0 80 -320 0 -320 0 0 -480z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M1825 1311 c-42 -11 -87 -35 -109 -60 -23 -26 -36 -19 -36 20 l0 29 -90 0 -90 0 0 -350 0 -350 95 0 95 0 0 253 0 254 25 23 c19 18 40 25 85 28 55 4 61 2 90 -26 l30 -30 0 -256 0 -256 95 0 95 0 0 271 c0 175 -4 285 -11 310 -14 46 -61 104 -100 124 -34 18 -132 27 -174 16z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M4045 1305 c-22 -8 -52 -27 -67 -44 -30 -33 -38 -31 -38 11 l0 28 -90 0 -90 0 0 -355 0 -355 95 0 95 0 0 234 0 233 28 28 c35 36 62 45 128 45 l54 0 0 89 c0 84 -1 89 -22 95 -33 8 -48 7 -93 -9z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M4462 1310 c-118 -18 -218 -96 -229 -179 l-6 -41 91 0 c88 0 90 1 96 25 7 29 60 65 94 65 37 0 88 -28 101 -56 6 -14 11 -40 11 -58 l0 -33 -106 -6 c-94 -4 -113 -9 -172 -38 -40 -21 -78 -49 -97 -72 -28 -36 -30 -45 -30 -121 0 -75 3 -86 28 -119 78 -103 254 -129 347 -50 17 14 32 24 33 22 2 -2 8 -17 15 -32 l12 -28 92 7 c51 4 94 8 96 9 1 1 -5 21 -13 45 -12 33 -15 91 -15 254 0 116 -4 227 -10 246 -32 115 -179 185 -338 160z m158 -449 c0 -75 -5 -86 -43 -110 -83 -50 -177 -20 -177 57 0 75 51 107 178 111 l42 1 0 -59z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M5273 1311 c-39 -10 -123 -59 -123 -71 0 -6 -4 -10 -10 -10 -5 0 -10 16 -10 35 l0 35 -90 0 -90 0 0 -350 0 -350 95 0 95 0 0 248 c1 179 4 251 13 262 39 50 119 65 177 35 43 -22 50 -63 50 -317 l0 -228 91 0 90 0 -3 283 c-3 253 -5 286 -22 317 -24 45 -54 78 -88 96 -34 18 -132 26 -175 15z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M5895 1298 c-80 -29 -142 -84 -183 -163 -25 -47 -27 -58 -27 -185 0 -155 13 -195 84 -273 62 -67 120 -92 216 -92 105 0 165 18 221 68 50 44 78 93 87 150 l6 37 -88 0 -88 0 -9 -31 c-18 -64 -109 -97 -173 -64 -52 26 -76 90 -75 200 1 54 7 106 16 130 27 73 110 105 178 70 30 -15 60 -61 60 -90 0 -12 15 -15 89 -15 l89 0 -5 43 c-18 139 -134 228 -296 226 -39 0 -85 -5 -102 -11z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M6597 1296 c-147 -53 -224 -189 -215 -379 7 -147 65 -242 185 -303 53 -26 67 -29 158 -29 87 0 107 4 155 26 59 27 120 74 120 91 0 6 -18 32 -41 59 l-41 49 -36 -29 c-90 -70 -196 -67 -264 5 -25 27 -48 72 -48 95 0 5 93 9 226 9 l226 0 -4 98 c-3 79 -9 107 -31 154 -56 115 -141 168 -272 167 -44 0 -97 -6 -118 -13z m184 -153 c17 -10 35 -34 45 -60 27 -70 22 -73 -122 -73 l-127 0 6 35 c7 42 41 93 71 105 35 14 96 11 127 -7z'
                transform='matrix(.1 0 0 -.1 0 764)' />
              <path d='M3010 1036 c0 -285 4 -313 55 -381 72 -93 233 -102 342 -19 l33 25 0 -30 0 -31 95 0 95 0 0 350 0 350 -100 0 -100 0 0 -255 c0 -250 0 -255 -22 -275 -36 -33 -91 -45 -139 -31 -65 20 -69 39 -69 321 l0 240 -95 0 -95 0 0 -264z'
                transform='matrix(.1 0 0 -.1 0 764)' />
            </g>
          </svg>
          <svg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 765.000000 763.000000'>
            <g fill='red'>
              <path d='M2274 6885 c-175 -38 -339 -189 -395 -365 -19 -57 -22 -97 -26 -338 l-6 -272 -31 19 c-111 68 -296 66 -405 -4 -60 -38 -128 -117 -157 -178 -35 -77 -43 -153 -44 -392 l0 -201 -71 4 c-115 7 -210 -45 -262 -142 -22 -40 -22 -47 -22 -521 0 -476 0 -480 22 -521 46 -87 126 -142 218 -151 29 -3 67 -1 84 5 l31 11 0 -202 c1 -327 19 -402 122 -507 127 -129 335 -158 484 -69 l32 19 5 -267 c3 -148 10 -288 17 -313 48 -193 225 -362 418 -400 243 -48 483 72 597 297 54 108 55 123 55 955 l0 766 50 -19 c48 -18 88 -19 850 -19 760 0 802 1 850 19 l49 19 3 -797 3 -796 23 -64 c57 -157 181 -285 331 -342 36 -13 90 -23 151 -26 163 -9 286 36 406 150 75 71 131 163 154 257 7 25 14 165 17 313 l5 267 32 -19 c142 -86 353 -60 473 57 112 109 124 152 130 469 l5 251 30 -10 c41 -14 127 -4 176 21 50 26 97 72 125 125 22 40 22 48 25 500 3 517 2 523 -70 602 -56 61 -123 87 -215 82 l-73 -3 0 200 c-1 239 -9 315 -44 392 -29 61 -97 140 -157 178 -109 70 -294 72 -405 4 l-31 -19 -6 272 c-5 310 -13 352 -87 465 -121 184 -325 277 -541 245 -211 -30 -400 -209 -444 -419 -12 -56 -15 -206 -15 -820 0 -414 -1 -753 -2 -753 -2 0 -21 7 -43 15 -60 21 -1650 21 -1710 0 -22 -8 -41 -15 -42 -15 -2 0 -3 339 -3 753 0 835 0 832 -65 956 -40 76 -140 180 -215 224 -104 60 -256 80 -386 52z m198 -166 c76 -16 124 -44 188 -108 39 -38 64 -75 81 -116 l24 -60 0 -1940 0 -1940 -23 -58 c-33 -81 -114 -166 -194 -203 -55 -25 -74 -29 -154 -29 -82 1 -98 4 -156 33 -78 38 -139 101 -176 180 l-27 57 -3 1947 c-2 1940 -2 1947 18 2001 44 116 146 206 263 232 79 17 94 17 159 4z m2891 -4 c121 -26 222 -113 267 -232 20 -54 20 -61 18 -2001 l-3 -1947 -27 -57 c-54 -116 -149 -188 -276 -210 -125 -21 -234 15 -321 107 -65 69 -89 120 -102 213 -6 51 -9 721 -7 1962 l3 1885 23 57 c45 111 157 204 272 227 64 13 77 12 153 -4z m-3643 -935 c42 -22 81 -62 106 -110 18 -33 19 -84 22 -1139 2 -731 -1 -1122 -8 -1160 -41 -222 -337 -260 -431 -56 -18 38 -19 96 -19 1178 0 1246 -3 1176 58 1240 70 74 182 93 272 47z m4450 0 c46 -24 85 -66 104 -112 14 -33 16 -169 16 -1173 0 -1253 4 -1173 -63 -1244 -128 -134 -352 -66 -387 118 -13 70 -14 2163 0 2244 25 154 191 238 330 167z m-5007 -802 c47 -25 46 -19 47 -486 l0 -443 -25 -24 c-33 -34 -93 -34 -132 -1 l-28 24 -3 424 c-2 232 0 434 3 446 14 57 86 88 138 60z m5460 -12 c14 -13 29 -35 32 -48 3 -12 5 -214 3 -446 l-3 -424 -28 -24 c-39 -33 -99 -33 -132 1 l-25 24 0 443 c1 333 4 447 13 459 35 44 100 52 140 15z m-1957 -240 l34 -34 0 -184 c0 -204 -4 -218 -66 -244 -50 -21 -1538 -21 -1588 0 -62 26 -66 40 -66 244 l0 184 34 34 34 34 792 0 792 0 34 -34z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M5760 1085 l0 -505 95 0 95 0 0 258 0 259 24 22 c30 29 103 39 146 21 56 -23 60 -43 60 -315 l0 -245 95 0 95 0 0 263 c0 302 -6 340 -67 400 -42 42 -84 57 -166 57 -66 0 -120 -19 -159 -57 l-28 -27 0 187 0 187 -95 0 -95 0 0 -505z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M1569 1540 c-105 -19 -191 -76 -231 -155 -30 -58 -28 -146 5 -212 42 -82 103 -123 269 -182 151 -53 193 -81 204 -138 18 -95 -86 -154 -215 -123 -60 14 -106 60 -117 115 l-6 35 -94 0 -94 0 0 -37 c0 -82 68 -176 160 -223 115 -58 297 -65 408 -15 64 29 124 85 144 133 17 44 14 162 -7 202 -41 82 -133 148 -277 198 -158 56 -208 91 -208 148 0 32 32 74 66 89 52 22 142 19 181 -5 32 -19 63 -66 63 -95 0 -12 16 -15 95 -15 l95 0 0 33 c0 86 -85 189 -189 228 -63 23 -180 33 -252 19z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M2178 1378 l-3 -83 -52 -3 -53 -3 0 -65 0 -64 49 0 49 0 4 -222 c3 -210 4 -226 27 -271 31 -65 82 -91 171 -91 36 0 77 3 93 7 26 7 27 9 27 77 l0 70 -45 0 c-32 0 -51 6 -65 20 -19 19 -20 31 -18 213 l3 192 58 3 57 3 0 64 0 64 -57 3 -58 3 -3 83 -3 82 -89 0 -89 0 -3 -82z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M5348 1378 l-3 -83 -52 -3 -53 -3 0 -65 0 -64 55 0 55 0 0 -223 c0 -211 1 -225 23 -267 40 -80 124 -112 236 -90 29 5 55 10 57 10 2 0 4 32 4 70 l0 70 -49 0 c-81 0 -81 1 -81 231 l0 199 60 0 60 0 0 65 0 65 -60 0 -60 0 0 85 0 85 -95 0 -94 0 -3 -82z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M2873 1299 c-18 -5 -49 -25 -68 -45 l-35 -35 0 36 0 35 -90 0 -90 0 0 -355 0 -355 95 0 95 0 0 238 c0 234 0 239 23 260 32 30 70 42 133 42 l54 0 0 89 c0 84 -1 89 -22 95 -30 8 -56 6 -95 -5z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M4113 1301 c-39 -10 -123 -59 -123 -71 0 -6 -4 -10 -10 -10 -5 0 -10 16 -10 35 l0 35 -95 0 -95 0 0 -350 0 -350 100 0 100 0 0 253 0 254 25 23 c19 18 40 25 83 28 51 4 62 1 88 -21 l29 -25 3 -256 3 -256 94 0 95 0 0 265 c0 240 -2 269 -20 318 -20 53 -54 94 -97 116 -29 15 -130 22 -170 12z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M3257 1286 c-87 -32 -146 -88 -189 -182 -20 -42 -23 -66 -23 -169 0 -102 3 -127 22 -167 30 -66 92 -129 160 -164 52 -26 67 -29 153 -29 118 1 183 21 245 78 l46 42 -46 53 -47 52 -34 -29 c-74 -65 -196 -67 -257 -4 -29 31 -60 97 -50 107 4 3 105 6 226 6 l220 0 -5 98 c-4 78 -10 108 -32 154 -54 115 -140 168 -271 167 -44 0 -97 -6 -118 -13z m184 -153 c17 -10 35 -34 45 -60 27 -70 22 -73 -120 -73 -69 0 -127 3 -129 8 -8 11 19 81 40 104 36 41 114 51 164 21z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M4685 1280 c-58 -30 -89 -64 -127 -139 -33 -65 -33 -67 -33 -206 0 -135 1 -142 30 -198 78 -156 242 -211 376 -128 l52 32 -7 -47 c-12 -90 -72 -144 -160 -144 -47 0 -116 26 -147 56 l-26 25 -41 -59 -41 -59 27 -26 c15 -14 50 -36 77 -49 43 -20 66 -23 165 -23 107 0 119 2 170 28 69 36 101 65 131 125 24 47 24 47 27 435 l3 387 -86 0 -85 0 0 -30 c0 -16 -3 -30 -6 -30 -3 0 -23 15 -46 33 -37 30 -46 32 -127 35 -70 2 -93 -2 -126 -18z m265 -165 l30 -29 0 -151 0 -151 -31 -30 c-26 -25 -38 -29 -89 -29 -48 0 -63 4 -86 25 -70 65 -89 214 -40 314 32 66 70 88 139 83 36 -3 55 -11 77 -32z'
                transform='matrix(.1 0 0 -.1 0 763)' />
            </g>
          </svg>
          <svg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 765.000000 767.000000'>
            <g fill='red'>
              <path d='M4732 6587 c-19 -20 -22 -35 -22 -98 0 -231 -35 -507 -95 -751 -58 -237 -66 -330 -40 -471 26 -151 110 -276 236 -354 l57 -35 9 -76 c13 -121 9 -711 -6 -852 -27 -263 -60 -365 -221 -685 -176 -349 -228 -511 -250 -790 -11 -135 -4 -175 36 -194 36 -16 50 -14 78 12 23 20 26 32 35 158 20 270 67 422 228 737 63 123 123 247 134 275 97 241 136 562 125 1022 -4 154 -9 299 -12 321 l-6 42 44 -5 c23 -2 178 11 344 30 l300 35 300 -34 c215 -25 320 -33 372 -28 l73 6 -6 -34 c-23 -122 -20 -666 4 -873 35 -296 75 -420 241 -749 171 -339 210 -463 231 -736 10 -133 13 -147 36 -167 27 -26 41 -28 77 -12 44 20 50 55 37 207 -23 272 -75 438 -246 777 -164 326 -199 439 -226 730 -18 191 -18 670 0 805 l14 105 72 68 c123 114 174 243 175 433 0 103 -8 152 -56 354 -53 217 -75 380 -83 609 -7 197 -8 204 -30 222 -22 18 -41 19 -259 17 l-235 -3 -18 -25 c-15 -20 -24 -82 -48 -305 l-29 -280 -81 -77 c-105 -100 -187 -141 -288 -146 -48 -3 -88 1 -118 12 -88 29 -205 129 -269 228 -13 21 -27 98 -51 290 -32 253 -34 263 -60 285 -25 22 -31 23 -254 23 -225 0 -228 0 -249 -23z m1835 -197 c7 -210 43 -458 99 -684 42 -165 55 -337 34 -427 -29 -121 -91 -197 -205 -250 -94 -45 -148 -45 -487 -5 l-296 35 -299 -35 c-341 -40 -393 -40 -486 4 -126 59 -185 143 -208 296 -14 96 -2 201 47 399 54 221 93 515 94 705 l0 32 130 0 c72 0 130 -3 131 -7 0 -5 15 -110 33 -235 l32 -227 48 -71 c67 -97 181 -202 270 -245 226 -112 442 -52 672 186 81 85 72 50 104 374 12 116 23 216 26 223 3 10 34 12 131 10 l128 -3 2 -75z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M638 6274 c-37 -20 -42 -48 -28 -151 52 -368 237 -619 505 -686 83 -21 456 -30 720 -18 267 12 326 28 463 127 22 16 24 16 50 -9 35 -33 114 -72 188 -93 127 -35 846 -40 979 -7 137 34 274 134 359 262 78 116 138 296 152 456 5 60 4 73 -12 92 -29 34 -66 39 -98 11 -21 -19 -28 -37 -36 -98 -47 -345 -200 -548 -445 -591 -96 -17 -772 -6 -845 13 -101 27 -167 72 -188 128 -5 13 -7 119 -4 236 l5 212 -26 26 c-34 34 -79 35 -112 1 l-25 -24 0 -223 c0 -254 -3 -265 -82 -312 -94 -55 -146 -60 -578 -61 l-395 0 -67 27 c-197 79 -320 268 -358 553 -13 95 -21 114 -57 133 -27 15 -32 15 -65 -4z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M1285 5933 c-78 -19 -95 -132 -25 -168 36 -19 54 -19 89 0 64 33 62 128 -3 159 -19 9 -36 15 -38 15 -1 -1 -12 -4 -23 -6z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M3270 5929 c-28 -10 -60 -56 -60 -86 0 -10 9 -32 19 -50 47 -77 171 -35 171 58 0 26 -61 89 -86 88 -11 0 -30 -5 -44 -10z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M1434 5082 c-80 -28 -127 -72 -164 -154 -19 -42 -20 -72 -20 -1212 0 -1159 0 -1170 20 -1212 39 -80 170 -174 243 -174 37 0 77 40 77 78 0 34 -27 61 -88 87 -24 10 -56 34 -72 52 l-30 34 0 1137 c0 889 3 1142 13 1162 15 31 73 70 102 70 38 0 75 37 75 76 0 70 -56 90 -156 56z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M3065 5075 c-49 -48 -18 -115 60 -129 55 -11 93 -40 105 -84 6 -24 10 -419 10 -1155 l0 -1117 -24 -38 c-24 -38 -35 -45 -118 -81 -34 -14 -49 -27 -54 -45 -18 -72 40 -118 115 -93 103 36 198 124 221 205 6 24 10 422 10 1162 0 911 -3 1136 -14 1183 -24 101 -91 172 -192 203 -66 20 -91 18 -119 -11z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M2264 4979 c-17 -19 -19 -42 -22 -280 l-3 -259 -319 0 -319 0 -20 -26 c-34 -43 -24 -86 26 -112 15 -8 114 -12 327 -12 l306 0 0 -270 0 -270 -295 0 c-197 0 -302 -4 -319 -11 -51 -23 -55 -103 -7 -128 13 -7 128 -11 320 -11 l301 0 0 -275 0 -275 -313 0 -314 0 -21 -23 c-27 -29 -28 -67 -3 -98 l19 -24 315 -3 316 -3 3 -250 c3 -250 3 -251 27 -270 28 -23 69 -24 99 -3 22 15 22 18 22 269 l0 254 316 3 316 3 19 24 c26 32 24 73 -4 99 -22 21 -31 22 -332 24 l-310 3 0 270 0 270 315 3 c306 2 315 3 337 24 38 35 29 89 -18 113 -23 12 -85 15 -334 15 l-305 0 0 270 0 270 295 0 c311 0 334 3 354 47 15 34 14 47 -10 77 l-20 26 -307 2 -307 3 -3 259 c-2 224 -5 262 -19 278 -23 26 -85 24 -109 -3z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M5690 4710 c-19 -19 -20 -33 -20 -300 l0 -280 -145 0 c-81 0 -154 -5 -168 -11 -33 -15 -49 -46 -42 -80 12 -53 33 -59 202 -59 l153 0 0 -180 0 -180 -159 0 -160 0 -20 -26 c-24 -30 -26 -43 -10 -77 18 -40 50 -47 204 -47 l145 0 0 -429 c0 -237 -3 -432 -8 -434 -4 -3 -72 -1 -152 4 -152 9 -230 26 -273 59 -34 27 -78 26 -105 -3 -46 -49 -12 -117 76 -155 97 -42 202 -52 532 -52 330 0 435 10 532 52 87 37 124 112 78 158 -27 27 -62 25 -108 -4 -49 -32 -160 -53 -302 -58 l-115 -3 -3 433 -2 432 144 0 c155 0 187 7 205 47 16 34 14 47 -10 77 l-20 26 -160 0 -159 0 0 180 0 180 153 0 c167 0 190 6 200 57 7 38 -11 70 -46 83 -16 5 -92 10 -168 10 l-139 0 0 278 c0 266 -1 279 -20 300 -27 29 -83 29 -110 2z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M4111 1584 c-26 -21 -31 -33 -31 -69 0 -36 5 -48 31 -69 44 -38 106 -36 148 3 95 88 -49 219 -148 135z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M1830 1500 l0 -79 143 -3 142 -3 3 -397 2 -398 95 0 95 0 0 400 0 400 145 0 145 0 0 80 0 80 -385 0 -385 0 0 -80z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M4753 1341 c-39 -10 -123 -59 -123 -71 0 -6 -4 -10 -10 -10 -5 0 -10 16 -10 35 l0 35 -95 0 -95 0 0 -350 0 -350 100 0 100 0 0 253 0 254 25 23 c19 18 40 25 83 28 51 4 62 1 88 -21 l29 -25 3 -256 3 -256 94 0 95 0 0 265 c0 240 -2 269 -20 318 -20 53 -54 94 -97 116 -29 15 -130 22 -170 12z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M2725 1311 c-74 -35 -116 -78 -152 -156 -26 -55 -28 -70 -28 -180 0 -109 2 -125 27 -177 31 -66 91 -128 156 -160 68 -33 214 -33 289 1 58 26 121 87 152 150 33 64 47 176 33 266 -20 125 -74 204 -174 254 -55 28 -71 31 -152 31 -80 0 -98 -4 -151 -29z m223 -141 c50 -31 72 -88 72 -190 0 -70 -4 -94 -22 -130 -31 -59 -68 -85 -123 -85 -88 0 -137 69 -143 201 -7 140 47 224 143 224 23 0 54 -9 73 -20z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M3605 1326 c-16 -7 -44 -25 -61 -39 -35 -30 -44 -27 -44 15 l0 28 -90 0 -90 0 0 -350 0 -350 95 0 95 0 0 246 c0 149 4 253 10 265 33 60 164 66 207 10 9 -12 12 -86 13 -268 l0 -253 101 0 101 0 -5 268 c-3 182 -8 279 -17 304 -18 51 -67 108 -106 124 -42 18 -169 17 -209 0z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M5323 1315 c-58 -29 -92 -69 -131 -153 -25 -53 -27 -67 -27 -187 0 -127 1 -132 33 -197 78 -159 237 -214 373 -129 l52 32 -7 -47 c-12 -90 -72 -144 -160 -144 -47 0 -116 26 -147 56 l-26 25 -41 -59 -41 -59 27 -26 c15 -14 50 -36 77 -49 43 -20 66 -23 165 -23 107 0 119 2 170 28 75 39 98 62 131 132 l29 60 0 378 0 377 -85 0 -85 0 0 -30 0 -30 -46 33 c-41 29 -54 32 -127 35 -72 3 -88 0 -134 -23z m247 -142 c47 -32 49 -40 50 -199 l0 -150 -31 -30 c-26 -25 -38 -29 -89 -29 -51 0 -63 4 -89 29 -96 92 -74 342 34 386 34 15 99 11 125 -7z'
                transform='matrix(.1 0 0 -.1 0 767)' />
              <path d='M4090 975 l0 -355 95 0 95 0 0 355 0 355 -95 0 -95 0 0 -355z'
                transform='matrix(.1 0 0 -.1 0 767)' />
            </g>
          </svg>
          <svg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 764.000000 763.000000'>
            <g fill='red'>
              <path d='M2685 6954 c-284 -41 -434 -90 -637 -206 -174 -98 -358 -263 -480 -428 -341 -460 -397 -1076 -144 -1580 46 -91 100 -178 156 -252 l35 -46 110 -6 c61 -3 308 -10 550 -16 242 -6 472 -13 511 -16 l72 -6 19 54 c11 29 143 410 293 845 151 436 275 792 276 790 1 -1 124 -508 273 -1127 149 -619 274 -1133 279 -1143 5 -12 77 174 237 608 126 344 231 625 234 625 3 -1 70 -135 148 -298 l143 -297 716 0 717 0 63 90 c115 164 197 352 234 537 73 356 27 701 -134 1014 -242 467 -659 764 -1183 843 -152 23 -427 9 -573 -28 -225 -59 -462 -176 -615 -306 -84 -70 -82 -70 -150 -14 -205 171 -477 298 -735 344 -91 16 -352 28 -415 19z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M3383 5369 c-17 -46 -113 -324 -214 -617 l-184 -533 -120 6 c-166 8 -825 25 -963 25 l-112 0 558 -557 c534 -532 697 -701 1285 -1320 l258 -272 307 312 c169 172 571 580 892 907 322 327 665 675 764 772 l179 178 -690 0 -689 0 -81 165 c-45 91 -83 162 -86 158 -2 -4 -118 -322 -258 -705 -140 -384 -256 -698 -259 -698 -4 0 -127 501 -274 1113 -148 611 -272 1121 -276 1131 -5 15 -14 -1 -37 -65z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M4430 1413 c0 -168 -1 -175 -18 -160 -77 70 -249 62 -323 -16 -71 -74 -99 -158 -99 -297 0 -189 68 -318 189 -359 79 -26 189 -4 235 48 27 30 36 26 36 -14 l0 -36 88 3 87 3 3 503 2 502 -100 0 -100 0 0 -177z m-51 -277 c54 -28 61 -52 61 -202 0 -152 -9 -179 -70 -204 -38 -16 -105 -7 -132 17 -53 47 -77 193 -49 299 10 38 50 86 81 97 29 10 81 7 109 -7z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M4818 1554 c-57 -30 -65 -98 -19 -145 24 -24 38 -29 76 -29 38 0 52 5 76 29 47 48 38 116 -21 146 -36 19 -77 19 -112 -1z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M2206 1534 c-93 -29 -183 -102 -224 -179 -49 -95 -73 -280 -53 -417 21 -149 106 -279 216 -333 66 -33 208 -45 282 -25 146 40 247 144 269 278 l7 42 -102 0 -101 0 0 -29 c0 -33 -33 -85 -73 -115 -23 -17 -43 -21 -106 -21 -69 0 -81 3 -114 27 -23 19 -43 47 -59 85 -20 52 -23 75 -23 213 0 141 2 160 23 205 42 90 91 125 179 125 69 0 126 -31 151 -83 12 -23 24 -54 27 -69 l5 -28 96 0 96 0 -7 48 c-17 114 -102 220 -211 262 -77 30 -208 36 -278 14z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M3038 1299 c-74 -11 -116 -29 -163 -70 -38 -33 -74 -98 -75 -131 0 -16 11 -18 94 -18 l94 0 10 29 c11 30 56 61 90 61 66 0 112 -46 112 -113 l0 -34 -97 -5 c-157 -9 -250 -53 -292 -141 -56 -115 3 -248 128 -293 78 -28 197 -8 252 42 15 14 18 12 28 -17 11 -32 11 -32 63 -25 29 3 70 6 92 6 37 0 38 1 31 28 -4 15 -10 137 -14 272 -6 226 -9 248 -29 287 -51 98 -175 145 -324 122z m162 -459 c0 -72 -22 -102 -90 -120 -75 -20 -129 13 -129 80 -1 69 44 98 152 99 l67 1 0 -60z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M3815 1295 c-22 -8 -52 -28 -67 -45 -24 -26 -28 -27 -28 -11 0 47 -7 51 -101 51 l-89 0 2 -352 3 -353 95 0 95 0 3 234 c2 206 4 237 20 254 26 30 76 47 137 47 l55 0 0 89 0 89 -31 6 c-42 8 -47 8 -94 -9z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M5285 1271 c-74 -35 -115 -78 -152 -156 -26 -56 -28 -69 -28 -185 0 -117 2 -128 27 -177 86 -162 274 -225 443 -149 110 49 168 132 187 265 26 188 -43 341 -185 407 -43 20 -68 24 -142 24 -79 0 -98 -4 -150 -29z m226 -144 c46 -31 68 -91 68 -193 1 -142 -62 -224 -161 -211 -82 11 -127 87 -128 212 0 95 30 174 77 199 42 23 104 20 144 -7z'
                transform='matrix(.1 0 0 -.1 0 763)' />
              <path d='M4780 935 l0 -355 95 0 95 0 0 355 0 355 -95 0 -95 0 0 -355z'
                transform='matrix(.1 0 0 -.1 0 763)' />
            </g>
          </svg>
        </article>
      </main>
    );
  }
}
