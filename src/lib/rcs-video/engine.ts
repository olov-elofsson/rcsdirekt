// @ts-nocheck
/* RCS-videomotor – simulerad Google Messages-demo (Android, sv-SE)
 * Deterministisk: samma flöde ger alltid samma bildrutor.
 *   buildProject(flow)            -> projekt med tidslinje (sekunder)
 *   createRenderer(el, project)   -> { renderAt(t), duration, frames, ready }
 *   exportMp4(project, opts)      -> Promise<Blob>  (1080x1920, 30 fps, H.264, inget ljud)
 *   loadInterFontCss()            -> Promise<string> (@font-face med inbäddade typsnitt)
 * Kalibrerad mot den godkända Bilia-videon (v3, 68,167 s).
 */

export const RCSV_CSS = `
   .rcsv{
    --bg:#ffffff; --text:#1f1f1f; --muted:#444746; --line:#e1e1e1;
    --in:#e8edf5; --out:#0a56cf; --blue:#0b57d0; --chipline:#c4c7c5;
    --pill:#e8edf5; --mic:#d1e1fc; --kb:#e7ecf4; --key:#ffffff; --keyspecial:#cbd3e3;
  }
  .rcsv,.rcsv *{box-sizing:border-box;margin:0;padding:0}
    .rcsv{font-family:"Inter",sans-serif;color:var(--text);-webkit-font-smoothing:antialiased;font-feature-settings:"cv11" 0}
  .rcsv{position:relative;width:360px;height:640px;overflow:hidden;background:var(--bg);text-align:left;line-height:normal}
  .rcsv .layer{position:absolute;left:0;top:0;width:360px;height:640px;background:var(--bg)}
  .rcsv svg.i{display:block}
  .rcsv svg.vb{display:inline-block;flex:none;vertical-align:-2px;margin-left:4px}
  .rcsv #hdr-name svg.vb{margin-left:5px;vertical-align:0}
  .rcsv #prof .name svg.vb{vertical-align:-3px;margin-left:5px}

  /* status bar */
  .rcsv #status{position:absolute;left:0;top:0;width:360px;height:30px;z-index:50;font-size:14.5px;font-weight:500;letter-spacing:.1px}
  .rcsv #clock{position:absolute;left:19px;top:8px}
  .rcsv #sicons{position:absolute;right:18px;top:8px;display:flex;align-items:center;gap:4px}
  .rcsv #sicons span{font-size:14.5px;margin-left:1px}
  .rcsv #navpill{position:absolute;left:144px;top:626.5px;width:73px;height:3px;border-radius:2px;background:#1f1f1f;z-index:60}

  /* inbox */
  .rcsv #search{position:absolute;left:13px;top:39px;width:292px;height:38px;border-radius:19px;background:var(--pill);display:flex;align-items:center}
  .rcsv #search .t{position:absolute;left:48px;font-size:14.5px;color:var(--muted)}
  .rcsv #search svg{position:absolute;left:14px}
  .rcsv #me{position:absolute;left:320px;top:45px;width:27px;height:27px;border-radius:50%;color:#fff;font-size:13.5px;display:flex;align-items:center;justify-content:center}
  .rcsv .row{position:absolute;left:0;width:360px;height:60px}
  .rcsv .row .av{position:absolute;left:16px;top:10px;width:40px;height:40px;border-radius:50%;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px}
  .rcsv .row img.av{border-radius:9px}
  .rcsv .row .n{position:absolute;left:69px;top:12px;font-size:15.4px}
  .rcsv .row .p{position:absolute;left:69px;top:32px;width:275px;font-size:13.5px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .rcsv .row .tm{position:absolute;right:16px;top:13px;font-size:12.5px;color:var(--muted)}
  .rcsv .row.unread .n, .rcsv .row.unread .p, .rcsv .row.unread .tm{font-weight:600;color:var(--text)}
  .rcsv #fab{position:absolute;left:194px;top:551px;width:150px;height:49px;border-radius:16px;background:#c1e5fe;box-shadow:0 1px 3px rgba(0,0,0,.18),0 2px 6px rgba(0,0,0,.08);display:flex;align-items:center}
  .rcsv #fab svg{position:absolute;left:17px}
  .rcsv #fab .t{position:absolute;left:50px;font-size:15px;font-weight:500;color:#001d35}

  /* conversation */
  .rcsv #hdr{position:absolute;left:0;top:42px;width:360px;height:50px;background:#fff;z-index:5}
  .rcsv #hdr .back{position:absolute;left:12px;top:13px}
  .rcsv #hdr-name{position:absolute;left:44px;top:5px;height:40px;padding:0 8px 0 4px;border-radius:20px;display:flex;align-items:center}
  .rcsv #hdr-name img{width:32px;height:32px;border-radius:8px;margin-right:9px}
  .rcsv #hdr-name span{font-size:16.6px}
  .rcsv #hdr .call{position:absolute;left:276px;top:13px}
  .rcsv #hdr .more{position:absolute;left:322px;top:13px}
  .rcsv #msgs{position:absolute;left:0;top:90px;width:360px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end}
  .rcsv #msgs .inner{display:flex;flex-direction:column;padding-bottom:0}
  .rcsv .it{overflow:hidden;flex:none}
  .rcsv .date{text-align:center;font-size:12.5px;color:var(--muted);padding:14px 0 10px}
  .rcsv .inrow{position:relative;padding-left:47px;padding-right:13px;line-height:0}
  .rcsv .inrow .avatar{position:absolute;left:12px;bottom:0;width:27px;height:27px;border-radius:7px}
  .rcsv .bubble{display:inline-block;vertical-align:top;max-width:248px;padding:8px 14px;border-radius:19px;font-size:15px;line-height:20.57px;background:var(--in);word-wrap:break-word}
  .rcsv .grp-mid .bubble{border-bottom-left-radius:5px}
  .rcsv .grp-next .bubble{border-top-left-radius:5px}
  .rcsv .gap2{height:3px}
  .rcsv .ts{font-size:11.5px;color:var(--muted);height:18px;line-height:18px;margin-top:3.5px;margin-bottom:7px}
  .rcsv .inrow + .ts, .rcsv .tsin{padding-left:47px}
  .rcsv .outrow{text-align:right;padding-right:13px;line-height:0}
  .rcsv .outrow .bubble{background:var(--out);color:#fff;text-align:left}
  .rcsv .tsout{text-align:right;padding-right:13px}
  .rcsv .card{display:inline-block;vertical-align:top;width:262px;border-radius:17px;overflow:hidden;background:var(--in)}
  .rcsv .card img{display:block;width:262px;height:150px;object-fit:cover}
  .rcsv .card .ct{padding:11px 14px 0;font-size:15.6px;font-weight:600;line-height:20px}
  .rcsv .card .cb{padding:4px 14px 9px;font-size:14.1px;line-height:19.2px}
  .rcsv .cbtn{position:relative;height:42px;border-top:1px solid #d4d9e1;display:flex;align-items:center;justify-content:center;color:var(--blue);font-size:15px;font-weight:500;gap:8px}
  .rcsv .chips{display:flex;gap:5px;padding-left:47px;margin-bottom:11px;margin-top:0}
  .rcsv .chip{height:33px;border:1px solid var(--chipline);border-radius:17px;padding:0 12.5px;display:flex;align-items:center;gap:6px;color:var(--blue);font-size:14.5px;font-weight:500;background:#fff;white-space:nowrap}
  .rcsv .chip.pressed{background:#d3e3fd}
  /* interactive phone on the website: real buttons styled as the screen's own elements */
  .rcsv button.cbtn,.rcsv button.chip{font:inherit;font-weight:500;cursor:pointer;-webkit-tap-highlight-color:transparent}
  .rcsv button.cbtn{width:100%;background:none;border:0;border-top:1px solid #d4d9e1;transition:background-color 120ms ease-out}
  .rcsv button.cbtn:active,.rcsv button.chip:active{background:#d3e3fd}
  .rcsv button.cbtn:focus-visible,.rcsv button.chip:focus-visible{outline:2px solid var(--blue);outline-offset:-2px}
  .rcsv .card .cimg{width:262px;height:150px;display:grid;place-items:center;background:#d3e3fd}
  .rcsv .card .cgap{height:9px}
  /* conversation intro: the verified sender at the top of a new thread */
  .rcsv .intro{text-align:center;padding:8px 0}
  .rcsv .intro img{display:block;width:56px;height:56px;margin:0 auto;border-radius:14px;background:#fff;border:1px solid var(--line);padding:8px}
  .rcsv .intro .n{margin-top:8px;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:1px}
  .rcsv .intro .s{margin-top:2px;font-size:12.5px;color:var(--muted)}

  .rcsv #composer{position:absolute;left:0;width:360px;height:60px}
  .rcsv #composer .plus{position:absolute;left:14px;top:18px}
  .rcsv #composer-input{position:absolute;left:50px;top:10px;width:253px;height:40px;border-radius:20px;background:var(--pill)}
  .rcsv #composer-input .emoji{position:absolute;left:12px;top:9px}
  .rcsv #composer-input .ph{position:absolute;left:44px;top:10.5px;font-size:14.6px;color:var(--muted);white-space:nowrap}
  .rcsv #composer-input .tx{position:absolute;left:12px;top:10.5px;font-size:14.6px;color:var(--text);white-space:nowrap}
  .rcsv #composer-input .gal{position:absolute;left:220px;top:9px}
  .rcsv .caret{display:inline-block;width:1.6px;height:19px;background:var(--blue);vertical-align:-3px;margin:0 .5px}
  .rcsv #send-btn{position:absolute;left:310px;top:10px;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center}

  /* keyboard */
  .rcsv #kb{position:absolute;left:0;width:360px;height:260px;background:var(--kb)}
  .rcsv #kb .strip{position:absolute;left:0;top:0;width:360px;height:40px}
  .rcsv #kb .strip .dv{position:absolute;top:13px;width:1px;height:15px;background:#8e918f}
  .rcsv #kb .strip .w{position:absolute;top:10px;width:120px;text-align:center;font-size:15px;color:#1f1f1f}
  .rcsv .key{position:absolute;height:44px;border-radius:6px;background:var(--key);display:flex;align-items:center;justify-content:center;font-size:21.5px;color:#1f1f1f}
  .rcsv .key.sp{background:var(--keyspecial)}
  .rcsv .key.down{background:var(--keyspecial)}
  .rcsv .key.caps{background:#d1e1fc}
  .rcsv .key.enter{background:var(--out)}

  /* profile */
  .rcsv #prof .back{position:absolute;left:14px;top:47px}
  .rcsv #prof .more{position:absolute;left:322px;top:47px}
  .rcsv #prof .banner{position:absolute;left:0;top:84px;width:360px;height:112px;object-fit:cover}
  .rcsv #prof .logo{position:absolute;left:144px;top:159px;width:72px;height:72px;border-radius:14px;border:3px solid #fff;object-fit:cover;background:#fff}
  .rcsv #prof .name{position:absolute;left:0;top:240px;width:360px;text-align:center;font-size:19px;font-weight:600}
  .rcsv #prof .desc{position:absolute;left:60px;top:265px;width:240px;text-align:center;font-size:13.1px;line-height:18.4px;color:var(--muted)}
  .rcsv #prof .act{position:absolute;top:322px;width:44px;height:44px;border-radius:50%;background:#e3e7e9;display:flex;align-items:center;justify-content:center}
  .rcsv #prof .divtop{position:absolute;left:0;top:379px;width:360px;height:1px;background:var(--line)}
  .rcsv #prof .crow{position:absolute;left:0;width:360px;height:61px}
  .rcsv #prof .crow svg{position:absolute;left:17px;top:20px}
  .rcsv #prof .crow .v{position:absolute;left:58px;top:12px;width:285px;font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .rcsv #prof .crow .l{position:absolute;left:58px;top:33px;font-size:12.6px;color:var(--muted)}
  .rcsv #prof .crow .dl{position:absolute;left:17px;bottom:0;width:326px;height:1px;background:var(--line)}

  /* typing indicator and verified mark (used by the website's interactive phone) */
  .rcsv .typing{display:inline-flex;gap:4px;align-items:center;height:36px;padding:0 14px;border-radius:19px;background:var(--in)}
  .rcsv .typing span{width:7px;height:7px;border-radius:50%;background:#747775;animation:rcsv-dot 1.2s ease-in-out infinite}
  .rcsv .typing span:nth-child(2){animation-delay:.15s}
  .rcsv .typing span:nth-child(3){animation-delay:.3s}
  @keyframes rcsv-dot{0%,60%,100%{opacity:.35;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
  @media (prefers-reduced-motion: reduce){.rcsv .typing span{animation:none;opacity:.6}}

  /* touch feedback */
  .rcsv .ring{position:absolute;width:32px;height:32px;margin:-16px 0 0 -16px;border-radius:50%;background:rgba(210,212,216,.45);border:1px solid rgba(150,150,150,.55);z-index:80}
  .rcsv .hl{background:rgba(31,31,31,.08)!important}
  .rcsv #gesture{position:absolute;width:32px;height:32px;border-radius:50%;background:#5f6368;z-index:81;display:flex;align-items:center;justify-content:center}

  .rcsv img{max-width:none;vertical-align:baseline}
`;

const FPS = 30;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const prog = (t, a, b) => clamp((t - a) / (b - a));
const easeIO = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const easeOut = x => 1 - Math.pow(1 - x, 3);
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const r3 = x => Math.round(x * 1000) / 1000;

const IC={
 back:'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
 more:'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
 call:'M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863q-2.5-2.5-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3ZM6.025 9l1.650-1.65L7.25 5H5.025q.125 1.025.35 2.025T6.025 9Zm8.95 8.95q.975.425 1.988.675T19 18.95v-2.2l-2.35-.475l-1.675 1.675Z',
 search:'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
 chat:'M6 14h8v-2H6v2Zm0-3h12V9H6v2Zm0-3h12V6H6v2ZM2 22V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6l-4 4Zm3.15-6H20V4H4v13.125L5.15 16Z',
 globe:'M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2.05q.65-.9 1.125-1.875T13.9 16h-3.8q.3 1.1.775 2.075T12 19.95Zm-2.6-.4q-.45-.825-.787-1.713T8.05 16H5.1q.725 1.25 1.813 2.175T9.4 19.55Zm5.2 0q1.4-.45 2.488-1.375T18.9 16h-2.95q-.225.95-.562 1.838T14.6 19.55ZM4.25 14h3.4q-.075-.5-.112-.988T7.5 12q0-.525.038-1.012T7.65 10h-3.4q-.125.5-.188.988T4 12q0 .525.063 1.012T4.25 14Zm5.4 0h4.7q.075-.5.113-.988T14.5 12q0-.525-.038-1.012T14.35 10h-4.7q-.075.5-.112.988T9.5 12q0 .525.038 1.012T9.65 14Zm6.7 0h3.4q.125-.5.188-.988T20 12q0-.525-.063-1.012T19.75 10h-3.4q.075.5.113.988T16.5 12q0 .525-.038 1.012T16.35 14Zm-.4-6h2.95q-.725-1.25-1.812-2.175T14.6 4.45q.45.825.788 1.713T15.95 8ZM10.1 8h3.8q-.3-1.1-.775-2.075T12 4.05q-.65.9-1.125 1.875T10.1 8Zm-5 0h2.95q.225-.95.563-1.838T9.4 4.45Q8 4.9 6.912 5.825T5.1 8Z',
 mail:'M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20H4Zm8-7L4 8v10h16V8l-8 5Zm0-2l8-5H4l8 5ZM4 8V6v12V8Z',
 event:'M10.95 18 7.4 14.45l1.45-1.45 2.1 2.1 4.2-4.2 1.45 1.45L10.95 18ZM5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z',
 open:'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21H5Zm4.7-5.3-1.4-1.4L17.6 5H14V3h7v7h-2V6.4l-9.3 9.3Z',
 plus:'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Z',
 emoji:'M15.5 11q.625 0 1.063-.437T17 9.5q0-.625-.437-1.062T15.5 8q-.625 0-1.062.438T14 9.5q0 .625.438 1.063T15.5 11Zm-7 0q.625 0 1.063-.437T10 9.5q0-.625-.437-1.062T8.5 8q-.625 0-1.062.438T7 9.5q0 .625.438 1.063T8.5 11Zm3.5 6.5q1.7 0 3.088-.962T17.1 14H6.9q.625 1.575 2.013 2.538T12 17.5ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Z',
 image:'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm0-2h14V5H5v14Zm1-2h12l-3.75-5-3 4L9 13l-3 4Zm-1 2V5v14Z',
 mic:'M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm-1 7v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.463 3.538T12 16q2.075 0 3.538-1.463T17 11h2q0 2.625-1.7 4.6T13 17.925V21h-2Z',
 send:'M3 20V4l19 8-19 8Zm2-3 11.85-5L5 7v3.5l6 1.5-6 1.5V17Zm0 0V7v10Z',
 shiftOff:'M8 20v-6H3.95L12 4l8.05 10H16v6H8Zm2-2h4v-6h1.85L12 7.2 8.15 12H10v6Zm2-6Z',
 shiftOn:'M8 18v-4H3.95L12 4l8.05 10H16v4H8Zm-1 4v-2h10v2H7Z',
 bksp:'M9.375 19q-.475 0-.9-.212t-.7-.588L2 12l5.775-6.2q.275-.375.7-.587T9.375 5H20q.825 0 1.413.588T22 7v10q0 .825-.587 1.413T20 19H9.375ZM11.4 16l2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6L18 9.4 16.6 8 14 10.6 11.4 8 10 9.4l2.6 2.6-2.6 2.6 1.4 1.4Z',
 enter:'M8.5 18 3 12.5 8.5 7l1.4 1.4-3.1 3.1H18V7h2v6.5H6.8l3.1 3.1L8.5 18Z',
 chevL:'M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6L14 18Z',
 // Card media icons, so the website's phone never needs another icon set.
 check:'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
 trendingUp:'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
 barChart:'M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z',
 code:'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
 layers:'M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z',
 shield:'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
 wallet:'M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
 sparkles:'M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z',
 touch:'M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z',
};

export const icon = (n, size = 24, color = '#1f1f1f') => `<svg class="i" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="${color}" d="${IC[n]}"/></svg>`;
// Verified-business badge, as Google Messages shows it next to a verified RCS sender.
export const verifiedBadge = (size = 16) => `<svg class="vb" width="${size}" height="${size}" viewBox="0 0 24 24" role="img" aria-label="Verifierad avsändare"><path fill="#0b57d0" d="m8.6 22.5-1.9-3.2-3.6-.8.35-3.7L1 12l2.45-2.8-.35-3.7 3.6-.8 1.9-3.2L12 2.95l3.4-1.45 1.9 3.2 3.6.8-.35 3.7L23 12l-2.45 2.8.35 3.7-3.6.8-1.9 3.2-3.4-1.45-3.4 1.45Z"/><path fill="#fff" d="m10.95 15.55 5.65-5.65-1.4-1.45-4.25 4.25-2.15-2.1-1.4 1.4 3.55 3.55Z"/></svg>`;

export function statusIcons(){
  return `<svg class="i" width="17" height="17" viewBox="0 0 24 24"><path fill="#1f1f1f" d="M17 4h4v17h-4zM11 9h4v12h-4zM5 14h4v7H5z"/></svg>
  <svg class="i" width="19" height="19" viewBox="0 0 24 24"><path fill="#1f1f1f" d="M12 21 0.8 9.3Q3.1 7.15 6.05 6.075 9 5 12 5t5.95 1.075Q20.9 7.15 23.2 9.3L12 21Zm0-3.15 1.9-1.95q-.4-.35-.875-.525T12 15.2q-.55 0-1.025.175t-.875.525L12 17.85ZM8.15 13.9q.8-.65 1.788-1.025T12 12.5q1.075 0 2.063.375t1.787 1.025l1.85-1.9q-1.15-.95-2.6-1.475T12 10q-1.65 0-3.1.525T6.3 12l1.85 1.9ZM4.15 9.8l1.75 1.8Q7.2 10.4 8.85 9.7T12 9q1.65 0 3.15.7t2.8 1.9l1.75-1.8Q18 8.25 16.050 7.375T12 6.5q-2.1 0-4.05.875T4.15 9.8Z"/></svg>
  <svg class="i" width="18" height="18" viewBox="0 0 24 24"><path fill="#1f1f1f" d="M3 17V7q0-.825.588-1.412T5 5h13q.825 0 1.413.588T20 7v2h1q.425 0 .713.288T22 10v4q0 .425-.288.713T21 15h-1v2q0 .825-.587 1.413T18 19H5q-.825 0-1.412-.587T3 17Zm2 0h13V7H5v10Z"/><path fill="#1f1f1f" d="M6 8h9v8H6z"/></svg><span>78%</span>`;
}

// =====================================================================
// 1) FLÖDE -> PROJEKT (automatisk tidslinje)
// =====================================================================
const words = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const readTime = (w, extra = 0) => clamp(1.5 + 0.18 * w + extra, 2.2, 7);
const KEY_GAPS = [0.300, 0.333, 0.234, 0.300, 0.267, 0.316, 0.283];
const LETTERS = 'QWERTYUIOPÅASDFGHJKLÖÄZXCVBNM';

/** Kontrollerar flödet och returnerar en lista med problem (tom = OK). */
export function validateFlow(flow) {
  const errs = [];
  const b = flow.brand || {};
  if (!b.displayName) errs.push('Visningsnamn saknas.');
  if (!b.logo) errs.push('Logotyp saknas.');
  if (!b.banner) errs.push('Banner saknas.');
  if (!flow.optin) errs.push('Opt-in-meddelande saknas.');
  let lastAgent = null;
  (flow.steps || []).forEach((s, i) => {
    const n = `Steg ${i + 1}: `;
    if (s.role === 'agent') {
      if (s.type === 'card' && !s.title && !s.body) errs.push(n + 'kortet saknar rubrik och text.');
      if (s.type === 'text' && !s.text) errs.push(n + 'meddelandet är tomt.');
      lastAgent = s;
    } else if (s.type === 'tap') {
      const opts = replyOptions(lastAgent);
      if (!opts.includes(s.label)) errs.push(n + `"${s.label || ''}" finns inte som svarsknapp i föregående avsändarmeddelande.`);
      lastAgent = null;
    } else if (s.type === 'type') {
      if (!s.text) errs.push(n + 'texten användaren skriver är tom.');
      const bad = [...String(s.text).toUpperCase()].filter(c => c !== ' ' && !LETTERS.includes(c));
      if (bad.length) errs.push(n + `tecknet "${bad[0]}" finns inte på demotangentbordet (bara bokstäver och mellanslag).`);
    }
  });
  for (const k of ['help', 'optout']) {
    const kw = flow[k]?.keyword || '';
    const bad = [...kw.toUpperCase()].filter(c => !LETTERS.includes(c));
    if (!kw || bad.length) errs.push((k === 'help' ? 'Hjälpord' : 'Opt-out-ord') + ' måste bestå av bokstäver.');
    if (!flow[k]?.reply) errs.push((k === 'help' ? 'Hjälpsvar' : 'Opt-out-bekräftelse') + ' saknas.');
  }
  return errs;
}

/** Svarsalternativ (reply) i ett avsändarsteg. */
export function replyOptions(agentStep) {
  if (!agentStep) return [];
  const list = agentStep.type === 'card' ? (agentStep.buttons || []) : (agentStep.chips || []);
  return list.filter(x => (x.action || 'reply') === 'reply' && x.label).map(x => x.label);
}

export function buildProject(flow) {
  const b = flow.brand;
  const P = {
    sender: {
      displayName: b.displayName, description: b.description || '', brandColor: b.color || '#1f1f1f',
      contacts: (b.contacts || []).filter(c => c.value), logo: b.logo, banner: b.banner,
    },
    inbox: flow.inbox || DEFAULT_INBOX,
    startClock: flow.startClock || '13:16:42',
    messages: [], taps: [], screens: {},
    keyboard: { open: null, capsTaps: [], keyDur: 0.133, typing: [], backGesture: null },
  };
  const M = P.messages, T = P.taps, K = P.keyboard;
  let id = 0; const nid = p => `${p}${++id}`;

  // --- öppning: inkorg -> konversation -> profil
  T.push({ t: 1.167, target: 'inbox-row-sender', dur: 0.30 });
  P.screens.openConversation = { tap: 1.167, from: 1.567, to: 1.900 };
  let cur = 1.900;
  if (flow.showProfile !== false) {
    T.push({ t: 3.300, target: 'hdr-name', dur: 0.23 });
    P.screens.openProfile = { tap: 3.300, from: 3.533, to: 3.867 };
    const hold = clamp(flow.profileSeconds ?? 6, 3, 12);
    const back = r3(3.867 + hold);
    T.push({ t: back, target: 'prof-back', dur: 0.20 });
    P.screens.closeProfile = { tap: back, from: r3(back + 0.2), to: r3(back + 0.5) };
    cur = back + 0.5;
  }
  M.push({ id: 'sep', type: 'date', text: 'Idag', t: -1 });
  M.push({ id: 'optin', type: 'in', t: -1, text: flow.optin, pre: true });

  // tillstånd under byggandet
  let lastAgentT = null;        // när senaste avsändarmeddelande kom
  let pendingRead = words(flow.optin); // ord att läsa innan nästa användaråtgärd
  let lastWasAgent = true;      // opt-in räknas som avsändare
  let firstAgent = true;
  let openChips = null;         // chips-objekt som ska bort vid nästa användaråtgärd
  let kbOpen = false, caps = false;
  let agentGroup = null;
  let lastOutT = cur;

  const agentArrive = (afterUser) => {
    if (firstAgent) { firstAgent = false; return r3(cur + readTime(pendingRead)); }
    return afterUser ? r3(lastOutT + 1.8) : r3(lastAgentT + 1.333);
  };

  const userActionTime = () => r3((lastAgentT ?? cur) + readTime(pendingRead));

  const addAgent = (s) => {
    const afterUser = !lastWasAgent;
    let t;
    if (s.newGroup && !afterUser && lastAgentT != null) { t = r3(lastAgentT + readTime(pendingRead)); agentGroup = null; }
    else t = agentArrive(afterUser);
    const accumulate = !afterUser && lastAgentT != null && !s.newGroup;
    if (!accumulate) pendingRead = 0;
    if (afterUser || !agentGroup) agentGroup = nid('g');
    const mid = nid('m');
    if (s.type === 'card') {
      M.push({ id: mid, type: 'card', t, image: s.image, title: s.title || '', body: s.body || '',
        buttons: (s.buttons || []).filter(x => x.label).map(x => ({ label: x.label, action: x.action || 'reply', target: x.target || '', icon: btnIcon(x) })) });
      pendingRead += words(s.title) + words(s.body) + 5; // bild
      agentGroup = null; // kort grupperas inte
    } else {
      M.push({ id: mid, type: 'in', t, text: s.text, group: agentGroup });
      pendingRead += words(s.text);
      const chips = (s.chips || []).filter(c => c.label);
      if (chips.length) {
        const cid = 'chips' + mid;
        openChips = { id: cid, type: 'chips', t, removeAt: null, chips: chips.map(c => ({ label: c.label, action: c.action || 'reply', target: c.target || '', icon: (c.action && c.action !== 'reply') ? btnIcon(c) : '' })) };
        M.push(openChips);
      }
    }
    lastAgentT = t; lastWasAgent = true;
    return M[M.length - 1];
  };

  const closeChips = (at) => { if (openChips) { openChips.removeAt = r3(at); openChips = null; } };

  const typeText = (text) => {
    const start = userActionTime();
    let tk;
    if (!kbOpen) {
      T.push({ t: start, target: 'composer-input', dur: 0.30 });
      K.open = { from: r3(start + 0.067), to: r3(start + 0.300) };
      kbOpen = true;
      tk = start + 0.8;
    } else tk = start;
    const letters = [...text];
    const wantsCaps = text === text.toUpperCase() && /[A-ZÅÄÖ]/.test(text) && text.replace(/\s/g, '').length > 1;
    if (wantsCaps && !caps) { K.capsTaps.push(r3(tk), r3(tk + 0.2)); caps = true; tk += 0.633; }
    const keys = [], times = [];
    letters.forEach((ch, i) => {
      keys.push(ch === ' ' ? 'space' : ch.toUpperCase());
      times.push(r3(tk));
      tk += KEY_GAPS[i % KEY_GAPS.length];
    });
    const lastKey = times[times.length - 1];
    const send = r3(lastKey + 0.533);
    const seq = { keys, chars: letters, times, send };
    K.typing.push(seq);
    const hadChips = !!openChips;
    closeChips(send + 0.167);
    const outT = r3(send + (hadChips ? 0.367 : 0.233));
    M.push({ id: nid('o'), type: 'out', t: outT, text });
    lastOutT = outT; lastWasAgent = false; agentGroup = null;
  };

  const tap = (label) => {
    // hitta senaste avsändarsteg med svarsknapp/chip med denna etikett
    const tt = userActionTime();
    for (let i = M.length - 1; i >= 0; i--) {
      const m = M[i];
      if (m.type === 'chips' && m === openChips) {
        const k = m.chips.findIndex(c => c.label === label && c.action === 'reply');
        if (k >= 0) {
          T.push({ t: tt, target: `chip-${m.id}-${k}`, dur: 0.30 });
          closeChips(tt + 0.2);
          const outT = r3(tt + 0.4);
          M.push({ id: nid('o'), type: 'out', t: outT, text: label });
          lastOutT = outT; lastWasAgent = false; agentGroup = null;
          return;
        }
      }
      if (m.type === 'card') {
        const k = m.buttons.findIndex(c => c.label === label && c.action === 'reply');
        if (k >= 0) {
          T.push({ t: tt, target: `card-${m.id}-btn-${k}`, dur: 0.30 });
          closeChips(tt + 0.2);
          const outT = r3(tt + 0.433);
          M.push({ id: nid('o'), type: 'out', t: outT, text: label });
          lastOutT = outT; lastWasAgent = false; agentGroup = null;
          return;
        }
      }
    }
    throw new Error(`Hittar ingen svarsknapp "${label}"`);
  };

  for (const s of flow.steps || []) {
    if (s.role === 'agent') addAgent(s);
    else if (s.type === 'tap') tap(s.label);
    else if (s.type === 'type') typeText(s.text);
  }
  // mallens slut: HJÄLP -> svar -> STOPP -> bekräftelse
  typeText(flow.help.keyword);
  addAgent({ type: 'text', text: flow.help.reply });
  typeText(flow.optout.keyword);
  const last = addAgent({ type: 'text', text: flow.optout.reply });
  let settle = last.t + 0.3;
  if (kbOpen) {
    const g = r3(last.t + 1.833);
    K.backGesture = { t: g, kbFrom: r3(g + 0.147), kbTo: r3(g + 0.400) };
    settle = g + 0.400;
  }
  const end = settle + clamp(flow.finalHold ?? 5, 3, 10) + 0.033;
  P.video = { width: 1080, height: 1920, fps: FPS, frames: Math.round(end * FPS) };
  P.duration = P.video.frames / FPS;
  // tangentbordsremsa
  K.typing.forEach(seq => { seq.strip = { '*': ['', '{w}', ''] }; });
  const opt = flow.optout.keyword.toUpperCase();
  if (opt === 'STOPP' || opt === 'STOP') { const seq = K.typing[K.typing.length - 1]; seq.strip = { STOP: ['STOPP', 'STOP', 'Stoppa'], STOPP: ['STOPP', 'STOP', 'Stoppa'], '*': ['', '{w}', ''] }; }
  // opt-in får tid = starttidens minut
  P.messages.find(m => m.id === 'optin').clock = clockAt(P.startClock, 0);
  return P;
}

function btnIcon(x) {
  const a = x.action || 'reply';
  if (a === 'url') return 'open';
  if (a === 'dial') return 'call';
  return x.icon === 'none' ? '' : (x.icon || 'event');
}

function clockAt(start, t) {
  const [h, m, s] = String(start).split(':').map(Number);
  const total = h * 3600 + m * 60 + (s || 0) + Math.floor(t + 1e-6);
  return String(Math.floor(total / 3600) % 24).padStart(2, '0') + ':' + String(Math.floor(total / 60) % 60).padStart(2, '0');
}

// =====================================================================
// 2) RENDERARE
// =====================================================================
// Android (Noto Color Emoji) 😊 som bild, så att inkorgen ser likadan ut på alla datorer
const EMOJI_SMILE = 'data:image/png;base64,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';
const KROWS = [['Q','W','E','R','T','Y','U','I','O','P','Å'],['A','S','D','F','G','H','J','K','L','Ö','Ä'],['Z','X','C','V','B','N','M']];
const contactIcon = type => type === 'phone' ? 'call' : type === 'web' ? 'globe' : 'mail';

export function createRenderer(host, P) {
  const root = document.createElement('div');
  root.className = 'rcsv';
  host.innerHTML = '';
  host.appendChild(root);
  ensureStyle();
  const S = P.sender;
  const TAPPOS = {};
  const $ = sel => root.querySelector(sel);

  function buildInbox() {
    const optin = P.messages.find(m => m.id === 'optin');
    let h = `<div id="search">${icon('search', 22, '#444746')}<span class="t">Sök i konversationer</span></div>
    <div id="me" style="background:${P.inbox.meColor}">${esc(P.inbox.meInitial)}</div>
    <div class="row unread" id="inbox-row-sender" style="top:92px"><img class="av" src="${S.logo}"><div class="n">${esc(S.displayName)}${verifiedBadge(15)}</div><div class="p">${esc(optin.text)}</div><div class="tm">${clockAt(P.startClock, 0)}</div></div>`;
    P.inbox.others.forEach((o, i) => {
      h += `<div class="row" style="top:${152 + i * 60}px"><div class="av" style="background:${o.color}">${esc(o.name[0])}</div><div class="n">${esc(o.name)}</div><div class="p">${esc(o.preview).replace(/😊/g, `<img src="${EMOJI_SMILE}" alt="" style="display:inline-block;width:14px;height:14px;vertical-align:-2px">`)}</div><div class="tm">${esc(o.time)}</div></div>`;
    });
    h += `<div id="fab">${icon('chat', 22, '#001d35')}<span class="t">Starta chatt</span></div>`;
    return h;
  }

  function buildProfile() {
    let h = `<div class="back" id="prof-back" style="position:absolute;left:12px;top:46px;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center">${icon('back', 24)}</div>
    <div class="more">${icon('more', 24)}</div>
    <img class="banner" src="${S.banner}">
    <img class="logo" src="${S.logo}">
    <div class="name">${esc(S.displayName)}${verifiedBadge(18)}</div>
    <div class="desc">${esc(S.description)}</div>`;
    const n = S.contacts.length;
    S.contacts.forEach((c, i) => { h += `<div class="act" style="left:${180 - 22 + (i - (n - 1) / 2) * 80}px">${icon(contactIcon(c.type), 22, S.brandColor)}</div>`; });
    const top0 = n ? 380 : 330;
    if (n) h += `<div class="divtop"></div>`;
    S.contacts.forEach((c, i) => {
      h += `<div class="crow" style="top:${top0 + i * 61}px">${icon(contactIcon(c.type), 22, '#1f1f1f')}<div class="v">${esc(c.value)}</div><div class="l">${esc(c.label)}</div>${i < n - 1 ? '<div class="dl"></div>' : ''}</div>`;
    });
    return h;
  }

  function keyHTML(k, x, y, w, st) {
    const lab = st.upper ? k : k.toLowerCase();
    return `<div class="key${st.down.has(k) ? ' down' : ''}" id="k-${k}" style="left:${x}px;top:${y}px;width:${w}px">${lab}</div>`;
  }
  function buildKeyboard(st) {
    let h = `<div class="strip"><div class="dv" style="left:120px"></div><div class="dv" style="left:239px"></div>`;
    const s = st.strip || ['', '', ''];
    h += `<div class="w" style="left:0">${esc(s[0])}</div><div class="w" style="left:120px">${esc(s[1])}</div><div class="w" style="left:240px">${esc(s[2])}</div></div>`;
    const pitch = 32.73, kw = 28.7;
    KROWS[0].forEach((k, i) => h += keyHTML(k, 3 + i * pitch, 40, kw, st));
    KROWS[1].forEach((k, i) => h += keyHTML(k, 3 + i * pitch, 88, kw, st));
    KROWS[2].forEach((k, i) => h += keyHTML(k, 67.3 + i * pitch, 136, kw, st));
    const shCls = st.caps ? 'caps' : (st.down.has('shift') ? 'down' : 'sp');
    h += `<div class="key ${shCls}" id="k-shift" style="left:18px;top:136px;width:45px">${icon(st.caps || st.shift ? 'shiftOn' : 'shiftOff', 22, '#1f1f1f')}</div>`;
    h += `<div class="key sp" style="left:298px;top:136px;width:46px">${icon('bksp', 22, '#1f1f1f')}</div>`;
    h += `<div class="key sp" style="left:3px;top:185px;width:46px;font-size:18px">?123</div>`;
    h += `<div class="key" style="left:53px;top:185px;width:29px;font-size:18px">,</div>`;
    h += `<div class="key" style="left:86px;top:185px;width:29px">${icon('emoji', 20, '#1f1f1f')}</div>`;
    h += `<div class="key${st.down.has('space') ? ' down' : ''}" id="k-space" style="left:119px;top:185px;width:155px;font-size:14.5px;color:#444746">Svenska</div>`;
    h += `<div class="key" style="left:278px;top:185px;width:29px;font-size:18px">.</div>`;
    h += `<div class="key enter" style="left:311px;top:185px;width:46px">${icon('enter', 22, '#ffffff')}</div>`;
    return h;
  }

  function typingState(t) {
    const K = P.keyboard;
    if (!K.open) return { kbP: 0, down: new Set(), text: '', caps: false, shift: false, strip: ['', '', ''], focused: false, upper: true };
    const kbOpen = prog(t, K.open.from, K.open.to);
    const kbClose = K.backGesture ? prog(t, K.backGesture.kbFrom, K.backGesture.kbTo) : 0;
    const kbP = (1 - Math.pow(1 - kbOpen, 4)) * (1 - easeIO(kbClose));
    const down = new Set(); let text = ''; let strip = ['', '', ''];
    const caps = K.capsTaps.length > 1 && t >= K.capsTaps[1];
    const shift = !caps && K.capsTaps.length > 0 && t >= K.capsTaps[0];
    for (const tp of K.capsTaps) if (t >= tp && t < tp + K.keyDur) down.add('shift');
    for (const seq of K.typing) {
      seq.times.forEach((kt, i) => { if (t >= kt && t < kt + K.keyDur) down.add(seq.keys[i]); });
      if (t >= seq.times[0] && t < seq.send + 0.167) {
        text = seq.chars.filter((c, i) => t >= seq.times[i]).join('');
        if (text) { const w = text.split(' ').pop(); const m = seq.strip[w] || seq.strip['*']; strip = w ? m.map(x => x.replace('{w}', w)) : ['', '', '']; }
      }
    }
    return { kbP, down, text, caps, shift, strip, focused: t >= K.open.from - 0.067, upper: caps || shift || text === '' || /[.!?]\s$/.test(text) };
  }
  const sendTapAt = t => P.keyboard.typing.some(seq => t >= seq.send && t < seq.send + 0.30);

  function chipsGoneAt(m) { const nx = P.messages.find(x => x.t > m.removeAt); return nx ? nx.t : m.removeAt + 0.1; }
  const isPressed = (target, t) => P.taps.some(tp => tp.target === target && t >= tp.t && t < tp.t + tp.dur);

  function cardHTML(m, t) {
    let b = '';
    m.buttons.forEach((bt, i) => {
      const tid = `card-${m.id}-btn-${i}`;
      b += `<div class="cbtn${isPressed(tid, t) ? ' hl' : ''}" id="${tid}">${bt.icon ? icon(bt.icon, 19, '#0b57d0') : ''}${esc(bt.label)}</div>`;
    });
    const img = m.image ? `<img src="${m.image}">` : '';
    return `<div class="card">${img}${m.title ? `<div class="ct">${esc(m.title)}</div>` : ''}${m.body ? `<div class="cb">${esc(m.body)}</div>` : '<div style="height:9px"></div>'}${b}</div>`;
  }

  function buildMessages(t) {
    const vis = P.messages.filter(m => m.t <= t && !(m.type === 'chips' && m.removeAt != null && t >= chipsGoneAt(m)));
    let h = '';
    vis.forEach((m, idx) => {
      const appear = m.t < 0 ? 1 : prog(t, m.t, m.t + 0.30);
      const st = `data-p="${appear.toFixed(5)}"`;
      const ts = m.clock || clockAt(P.startClock, Math.max(0, m.t));
      if (m.type === 'date') { h += `<div class="it" ${st}><div class="date">${esc(m.text)}</div></div>`; return; }
      const next = vis.slice(idx + 1).find(x => x.type !== 'chips'), prev = vis[idx - 1];
      if (m.type === 'in' || m.type === 'card') {
        const contNext = next && m.group && next.group === m.group;
        const contPrev = prev && m.group && prev.group === m.group;
        const body = m.type === 'card' ? cardHTML(m, t) : `<div class="bubble">${esc(m.text)}</div>`;
        const cls = (contNext ? ' grp-mid' : '') + (contPrev ? ' grp-next' : '');
        h += `<div class="it" ${st}><div class="inrow${cls}">${contNext ? '' : `<img class="avatar" src="${S.logo}">`}${body}</div>${contNext ? '<div class="gap2"></div>' : `<div class="ts tsin">${ts}</div>`}</div>`;
      } else if (m.type === 'out') {
        h += `<div class="it" ${st}><div class="outrow"><div class="bubble">${esc(m.text)}</div></div><div class="ts tsout">${ts}</div></div>`;
      } else if (m.type === 'chips') {
        const fade = m.removeAt == null ? 1 : 1 - prog(t, m.removeAt, m.removeAt + 0.1);
        let c = '';
        m.chips.forEach((ch, i) => {
          const tid = `chip-${m.id}-${i}`;
          c += `<div class="chip${isPressed(tid, t) ? ' pressed' : ''}" id="${tid}">${ch.icon ? icon(ch.icon, 18, '#0b57d0') : ''}${esc(ch.label)}</div>`;
        });
        h += `<div class="it" ${st} data-fade="${fade.toFixed(4)}"><div class="chips">${c}</div></div>`;
      }
    });
    return h;
  }

  function buildConversation(t) {
    const ty = typingState(t);
    const inset = 24 + (260 - 24) * ty.kbP;
    const compTop = 640 - inset - 60;
    const msgsH = compTop - 90 + 8;
    let h = `<div id="hdr"><div class="back">${icon('back', 24)}</div>
      <div id="hdr-name"><img src="${S.logo}"><span>${esc(S.displayName)}</span>${verifiedBadge(16)}</div>
      <div class="call">${icon('call', 24)}</div><div class="more">${icon('more', 24)}</div></div>`;
    h += `<div id="msgs" style="height:${msgsH}px"><div class="inner">${buildMessages(t)}</div></div>`;
    const hasText = ty.text.length > 0;
    let inner = `<div class="emoji">${hasText ? '' : icon('emoji', 22, '#444746')}</div>`;
    if (hasText) inner = `<div class="tx">${esc(ty.text).replace(/ /g, '&nbsp;')}<span class="caret"></span></div>`;
    else inner += `<div class="ph" style="${ty.focused ? 'left:43px' : ''}">${ty.focused ? '<span class="caret" style="margin-left:-1px"></span>' : ''}RCS-meddelande</div>`;
    inner += `<div class="gal">${icon('image', 22, '#444746')}</div>`;
    const btn = hasText || sendTapAt(t)
      ? `<div id="send-btn" style="background:#0a56cf">${icon('send', 20, '#ffffff')}</div>`
      : `<div id="send-btn" style="background:#d1e1fc">${icon('mic', 22, '#0b57d0')}</div>`;
    h += `<div id="composer" style="top:${compTop}px"><div class="plus">${icon('plus', 24, '#1f1f1f')}</div><div id="composer-input">${inner}</div>${btn}</div>`;
    if (ty.kbP > 0) h += `<div id="kb" style="top:${380 + 260 * (1 - ty.kbP)}px">${buildKeyboard(ty)}</div>`;
    return h;
  }

  function allTaps() {
    const out = [...P.taps], K = P.keyboard;
    K.capsTaps.forEach(tt => out.push({ t: tt, target: 'k-shift', dur: K.keyDur }));
    K.typing.forEach(seq => {
      seq.times.forEach((tt, i) => out.push({ t: tt, target: 'k-' + seq.keys[i], dur: K.keyDur }));
      out.push({ t: seq.send, target: 'send-btn', dur: 0.30 });
    });
    return out;
  }
  const TAPS = allTaps();

  function renderAt(t, opts = {}) {
    const so = P.screens, D = 50;
    const eq = x => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    const e1 = eq(prog(t, so.openConversation.from, so.openConversation.to));
    let h = `<div id="status"><div id="clock">${clockAt(P.startClock, t)}</div><div id="sicons">${statusIcons()}</div></div><div id="navpill"></div>`;
    if (e1 < 1) h += `<div class="layer" id="inbox" style="opacity:${1 - e1};transform:translateX(${-D * e1}px)">${buildInbox()}</div>`;
    let cOp = e1, cX = D * (1 - e1), pOp = 0, pX = 0;
    if (so.openProfile) {
      const p2 = prog(t, so.openProfile.from, so.openProfile.to), p3 = prog(t, so.closeProfile.from, so.closeProfile.to);
      const e2 = eq(p2), e3 = eq(p3);
      const outF = p => 1 - easeOut(prog(p, 0, 0.3)), inF = p => Math.pow(prog(p, 0.2, 1), 0.8);
      if (t >= so.openProfile.from) { cOp = outF(p2); cX = -D * e2; pOp = inF(p2); pX = D * (1 - e2); }
      if (t >= so.closeProfile.from) { cOp = inF(p3); cX = -D * (1 - e3); pOp = outF(p3); pX = D * e3; }
    }
    if (cOp > 0) h += `<div class="layer" id="conv" style="opacity:${cOp};transform:translateX(${cX}px)">${buildConversation(t)}</div>`;
    if (pOp > 0) h += `<div class="layer" id="prof" style="opacity:${pOp};transform:translateX(${pX}px)">${buildProfile()}</div>`;
    root.innerHTML = h;
    root.appendChild($('#status')); root.appendChild($('#navpill'));

    // nya objekt: full höjd, listan glider upp, objektet tonas in
    let offset = 0;
    root.querySelectorAll('#msgs .it').forEach(el => {
      const p = parseFloat(el.dataset.p);
      const f = el.dataset.fade !== undefined ? parseFloat(el.dataset.fade) : 1;
      if (p < 1) { const hh = el.offsetHeight; offset += hh * Math.pow(1 - p, hh > 250 ? 4.5 : 3); el.style.opacity = easeOut(Math.min(1, p * 2.2)); }
      if (f < 1) el.style.opacity = f;
    });
    for (const m of P.messages) {
      if (m.type !== 'chips' || m.removeAt == null) continue;
      const g = chipsGoneAt(m), p = prog(t, g, g + 0.30);
      if (t >= g && p < 1) offset -= 44 * Math.pow(1 - p, 3);
    }
    const inner = $('#msgs .inner');
    if (inner && Math.abs(offset) > 0.01) inner.style.transform = `translateY(${offset}px)`;

    for (const tp of P.taps) {
      if (t >= tp.t && t < tp.t + tp.dur && ['inbox-row-sender', 'hdr-name', 'prof-back', 'composer-input'].includes(tp.target)) {
        const el = $('#' + tp.target); if (el) el.classList.add('hl');
      }
    }
    if (!opts.noRings) {
      const rb = root.getBoundingClientRect();
      for (const tp of TAPS) {
        if (t >= tp.t && t < tp.t + tp.dur) {
          let pos = TAPPOS[tp.target + '@' + tp.t];
          const live = $('#' + CSS.escape(tp.target));
          if (pos && live) { const r = live.getBoundingClientRect(); pos = [(r.left - rb.left) / scaleOf() + pos[2], (r.top - rb.top) / scaleOf() + pos[3]]; }
          if (pos) { const d = document.createElement('div'); d.className = 'ring'; d.style.left = pos[0] + 'px'; d.style.top = pos[1] + 'px'; root.appendChild(d); }
        }
      }
      const g = P.keyboard.backGesture;
      if (g && t >= g.t && t < g.kbFrom + 0.05) {
        const p = prog(t, g.t, g.kbFrom);
        const d = document.createElement('div'); d.id = 'gesture';
        d.style.left = (4 + 6 * easeOut(p)) + 'px'; d.style.top = '219px';
        d.innerHTML = icon('chevL', 20, '#ffffff'); root.appendChild(d);
        const r = document.createElement('div'); r.className = 'ring'; r.style.left = (14 + 40 * easeOut(p)) + 'px'; r.style.top = '235px'; root.appendChild(r);
      }
    }
  }

  // skala när renderaren visas förminskad (CSS transform på host)
  function scaleOf() { const r = root.getBoundingClientRect(); return r.width / 360 || 1; }

  function computeTapPositions() {
    const rb = () => root.getBoundingClientRect();
    for (const tp of TAPS) {
      renderAt(tp.t + 0.0001, { noRings: true });
      const el = $('#' + CSS.escape(tp.target));
      if (!el) continue;
      const r = el.getBoundingClientRect(), b = rb(), k = scaleOf();
      const L = (r.left - b.left) / k, Tt = (r.top - b.top) / k, W = r.width / k, H = r.height / k;
      let cx = L + W / 2, cy = Tt + H / 2;
      if (tp.target === 'hdr-name') cx = L + W * 0.55;
      if (tp.target === 'inbox-row-sender') cx = 150;
      if (tp.target === 'composer-input') cx = L + 120;
      TAPPOS[tp.target + '@' + tp.t] = [cx, cy, cx - L, cy - Tt];
    }
  }

  const ready = (async () => {
    if (fontCssPromise) { try { await fontCssPromise; } catch (e) {} }
    try { await document.fonts.ready; } catch (e) {}
    const srcs = [S.logo, S.banner, ...P.messages.filter(m => m.image).map(m => m.image)].filter(Boolean);
    await Promise.all(srcs.map(src => new Promise(res => { const i = new Image(); i.onload = res; i.onerror = res; i.src = src; })));
    computeTapPositions();
    renderAt(0);
  })();

  return { root, renderAt, ready, duration: P.duration, frames: P.video.frames, fps: FPS };
}

let styleEl = null;
function ensureStyle() {
  if (styleEl || typeof document === 'undefined') return;
  styleEl = document.createElement('style');
  styleEl.textContent = RCSV_CSS;
  document.head.appendChild(styleEl);
}

// =====================================================================
// 3) TYPSNITT (Inter från Google Fonts, inbäddat för exporten)
// =====================================================================
let fontCssPromise = null;
const RANGE = {
  latin: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  'latin-ext': 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
};
/**
 * files: [{ weight: 400, subset: 'latin', url }] – lokala woff2-filer (t.ex. från @fontsource/inter).
 * Utan files hämtas Inter från Google Fonts.
 */
export function loadInterFontCss(files) {
  if (fontCssPromise) return fontCssPromise;
  fontCssPromise = (async () => {
    const out = [];
    if (files && files.length) {
      for (const f of files) {
        const buf = await (await fetch(f.url)).arrayBuffer();
        out.push(`@font-face{font-family:'Inter';font-style:normal;font-weight:${f.weight};font-display:block;src:url(data:font/woff2;base64,${arrayBufferToBase64(buf)}) format('woff2');unicode-range:${RANGE[f.subset] || RANGE.latin}}`);
      }
    } else {
      const css = await (await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=block')).text();
      const blocks = css.split('/*').slice(1).map(b => '/*' + b).filter(b => /latin(-ext)?\s*\*\//.test(b.slice(0, 40)));
      for (const blk of blocks) {
        const m = blk.match(/url\((https:[^)]+)\)/); if (!m) continue;
        const buf = await (await fetch(m[1])).arrayBuffer();
        out.push(blk.replace(m[1], `data:font/woff2;base64,${arrayBufferToBase64(buf)}`));
      }
    }
    const all = out.join('\n');
    const st = document.createElement('style'); st.textContent = all; document.head.appendChild(st);
    try { await document.fonts.load('400 15px Inter'); await document.fonts.load('600 15px Inter'); await document.fonts.load('500 15px Inter'); } catch (e) {}
    return all;
  })();
  return fontCssPromise;
}
function arrayBufferToBase64(buf) {
  const bytes = new Uint8Array(buf); let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
export async function toDataUrl(src) {
  if (!src || src.startsWith('data:')) return src;
  const blob = await (await fetch(src)).blob();
  return await new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });
}

// =====================================================================
// 4) MP4-EXPORT (WebCodecs + mp4-muxer)
// =====================================================================
export function canExportMp4() {
  return typeof window !== 'undefined' && 'VideoEncoder' in window && 'VideoFrame' in window;
}

/**
 * opts: { Muxer, ArrayBufferTarget, fontCss, onProgress(frame,total), signal, bitrate }
 * Muxer/ArrayBufferTarget kommer från npm-paketet "mp4-muxer".
 */
export async function exportMp4(P, opts) {
  const { Muxer, ArrayBufferTarget } = opts;
  const W = 1080, H = 1920, n = P.video.frames;
  const codec = 'avc1.640033';
  const cfg = { codec, width: W, height: H, bitrate: opts.bitrate || 6_000_000, framerate: FPS, avc: { format: 'avc' } };
  const sup = await VideoEncoder.isConfigSupported(cfg);
  if (!sup.supported) throw new Error('Webbläsaren kan inte koda H.264. Använd Chrome eller Edge på dator.');

  // bädda in bilder som data-URL (krävs i SVG-bilden)
  const P2 = structuredClone(P);
  P2.sender.logo = await toDataUrl(P2.sender.logo);
  P2.sender.banner = await toDataUrl(P2.sender.banner);
  for (const m of P2.messages) if (m.image) m.image = await toDataUrl(m.image);

  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-10000px;top:0;width:360px;height:640px;overflow:hidden;pointer-events:none';
  document.body.appendChild(host);
  const R = createRenderer(host, P2);
  await R.ready;

  const target = new ArrayBufferTarget();
  const muxer = new Muxer({ target, video: { codec: 'avc', width: W, height: H, frameRate: FPS }, fastStart: 'in-memory', firstTimestampBehavior: 'offset' });
  let encErr = null;
  const enc = new VideoEncoder({ output: (chunk, meta) => muxer.addVideoChunk(chunk, meta), error: e => { encErr = e; } });
  enc.configure(cfg);
  const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const fontCss = opts.fontCss || '';
  const css = fontCss + '\n' + RCSV_CSS;

  try {
    for (let i = 0; i < n; i++) {
      if (opts.signal?.aborted) throw new DOMException('Avbruten', 'AbortError');
      if (encErr) throw encErr;
      R.renderAt(i / FPS);
      const html = new XMLSerializer().serializeToString(R.root);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 360 640"><foreignObject x="0" y="0" width="360" height="640"><div xmlns="http://www.w3.org/1999/xhtml"><style>${css.replace(/</g, '\\3c ')}</style>${html.replace(/^<div xmlns="http:\/\/www.w3.org\/1999\/xhtml"/, '<div')}</div></foreignObject></svg>`;
      const img = new Image(); img.decoding = 'sync';
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      await img.decode();
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);
      const frame = toI420Frame(ctx, W, H, i);
      enc.encode(frame, { keyFrame: i % 60 === 0 });
      frame.close();
      while (enc.encodeQueueSize > 4) await new Promise(r => setTimeout(r, 1));
      if (opts.onProgress && (i % 5 === 0 || i === n - 1)) opts.onProgress(i + 1, n);
    }
    await enc.flush();
    muxer.finalize();
  } finally {
    try { enc.close(); } catch (e) {}
    host.remove();
  }
  return new Blob([target.buffer], { type: 'video/mp4' });
}

// RGBA -> I420, BT.709, begränsat omfång (yuv420p) – samma format som ffmpeg-leveransen
let yuvBuf = null;
function toI420Frame(ctx, W, H, i) {
  const rgba = ctx.getImageData(0, 0, W, H).data;
  const ySize = W * H, cSize = (W >> 1) * (H >> 1);
  if (!yuvBuf || yuvBuf.length !== ySize + 2 * cSize) yuvBuf = new Uint8Array(ySize + 2 * cSize);
  const Y = yuvBuf, U0 = ySize, V0 = ySize + cSize, cw = W >> 1;
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      let rs = 0, gs = 0, bs = 0;
      for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
        const p = ((y + dy) * W + (x + dx)) * 4, r = rgba[p], g = rgba[p + 1], b = rgba[p + 2];
        Y[(y + dy) * W + x + dx] = (16 + (219 * (0.2126 * r + 0.7152 * g + 0.0722 * b)) / 255 + 0.5) | 0;
        rs += r; gs += g; bs += b;
      }
      rs /= 4; gs /= 4; bs /= 4;
      const ci = (y >> 1) * cw + (x >> 1);
      Y[U0 + ci] = (128 + (224 * (-0.1146 * rs - 0.3854 * gs + 0.5 * bs)) / 255 + 0.5) | 0;
      Y[V0 + ci] = (128 + (224 * (0.5 * rs - 0.4542 * gs - 0.0458 * bs)) / 255 + 0.5) | 0;
    }
  }
  return new VideoFrame(yuvBuf, { format: 'I420', codedWidth: W, codedHeight: H, timestamp: Math.round(i * 1e6 / FPS), duration: Math.round(1e6 / FPS),
    colorSpace: { primaries: 'bt709', transfer: 'bt709', matrix: 'bt709', fullRange: false } });
}

// =====================================================================
// 5) STANDARDVÄRDEN
// =====================================================================
export const DEFAULT_INBOX = {
  others: [
    { name: 'Mamma', preview: 'Ses på söndag! 😊', time: '09:41', color: '#664fa2' },
    { name: 'Erik Lindqvist', preview: 'Låter bra, jag tar med kaffe', time: 'igår', color: '#0a7f41' },
    { name: 'Sara', preview: 'Tack för igår!', time: 'sön', color: '#c3221d' },
  ],
  meInitial: 'O', meColor: '#7b593b',
};
