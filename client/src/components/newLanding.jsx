import React from "react";
import Auth from "../auth.js";
const auth = new Auth();

const Landing = () => {
  window.addEventListener("scroll", function(event) {
    var depth, i, layer, layers, len, movement, topDistance, translate3d;
    topDistance = this.pageYOffset;
    layers = document.querySelectorAll("[data-type='parallax']");
    for (i = 0, len = layers.length; i < len; i++) {
      layer = layers[i];
      depth = layer.getAttribute("data-depth");
      movement = -(topDistance * depth);
      translate3d = "translate3d(0, " + movement + "px, 0)";
      layer.style["-webkit-transform"] = translate3d;
      layer.style["-moz-transform"] = translate3d;
      layer.style["-ms-transform"] = translate3d;
      layer.style["-o-transform"] = translate3d;
      layer.style.transform = translate3d;
    }
  });
  return (
    <React.Fragment>
      <div id="hero">
        <div className="layer layer0" data-type="parallax" data-depth="0.01" />
        <div className="layer layer1" data-type="parallax" data-depth="0.35" />
        <div className="layer layer2" data-type="parallax" data-depth="0.40" />
        <div className="layer layer3" data-type="parallax" data-depth="0.50" />
        <div className="layer layer4" data-type="parallax" data-depth="0.60" />
        <div className="layer layer5" data-type="parallax" data-depth="0.70" />
        <div className="layer layer6" data-type="parallax" data-depth="0.80" />
      </div>
      <div className="fullpage">
        <header>
          <h1 className="lpheader">Wecome to Health Monsters!</h1>
          <button
            className="lptopbutton"
            onClick={() => {
              auth.login();
            }}
          >
            Resume your Journey
          </button>
        </header>
        <div className="lpfirst">
          <h1>Are you feeling at the top of your game?</h1>
        </div>
        <div className="lpfirstbox">
          <img className="hungry" />
          <div className="lpfmess">
            Have you been having that feeling in the pit of your stomach?
          </div>
        </div>
        <div className="lpsecondbox">
          <img className="tired" />
          <div className="lpsmess">
            Have you been getting through the day without running out of energy?
          </div>
        </div>
        <div className="lpthirdbox">
          <h1 className="lptmess">THEN YOU'RE IN THE RIGHT PLACE!</h1>
        </div>
        <div className="lpfinalbox">
          <h2 className="lpfour">
            Take back control of your life with our interactive health
            management system!
          </h2>
        </div>
        <button
          className="lpbottombutton"
          onClick={() => {
            auth.login();
          }}
        >
          GET STARTED HERE!
        </button>

        <footer className="lpfooter">
          <h1 className="disclaim">Please dont take this software seriously</h1>
        </footer>
      </div>
    </React.Fragment>
  );
};
export default Landing;
//rgb(46, 17, 45)

//0.726
