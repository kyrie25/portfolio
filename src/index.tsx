import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faDiscord,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

const App: React.FC = () => {
  const [data, setData] = React.useState<Record<string, any>>({});

  useEffect(() => {
    fetch(`https://api.kyrie25.me/discord/${DISCORD_ID}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.webp?size=256`;
  const banner = `url(https://cdn.discordapp.com/banners/${data.id}/${data.banner}.webp?size=4096)`;

  return (
    <main>
      <section>
        <header>
          {data.banner && (
            <div className="blur" style={{ backgroundImage: banner }}></div>
          )}
          <div className="avatar">
            {data.avatar && <img src={avatar} alt="Kyrie25" />}
            <h1>Kyrie</h1>
          </div>
        </header>

        <article>
          <h3>
            Junior full-stack developer, CS undergraduate at{" "}
            <a
              href="https://fit.hcmus.edu.vn/"
              target="_blank"
              rel="noreferrer"
            >
              fit@hcmus
            </a>
          </h3>
        </article>

        <article>
          <p>Absolute Granblue nerd</p>
          <p>My 3rd website so far i just want a clean site</p>
        </article>

        <article>
          <h3>Contact me via:</h3>
          <div className="icons">
            <a href="mailto:contact@kyrie25.me">
              <FontAwesomeIcon icon={faEnvelope} size="1x" />
            </a>
            <a
              href={`https://discord.com/users/${data.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faDiscord} size="1x" />
            </a>
            <a
              href="https://twitter.com/_kyrie_25"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} size="1x" />
            </a>
            <a
              href="https://github.com/kyrie25"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="1x" />
            </a>
          </div>
        </article>

        <footer>
          <p>(images are from my discord profile)</p>
        </footer>
      </section>
    </main>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
