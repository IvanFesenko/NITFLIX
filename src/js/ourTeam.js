import refs from './refs';
import clearMovieList from './services/clearMovieList';
import max from '../images/team/maxim.jpg';
import ivan from '../images/team/ivan.jpg';
import vadym from '../images/team/vadym.jpg';
import nikita from '../images/team/nikita.jpg';
import dima from '../images/team/dima.jpg';

const ourTeam = `
<div class="team-wrap">
<div class="team">
    <div class="team__block">
      <div class="inner-box">
        <ul class="social-icons">
          <li>
            <a
              href="https://www.linkedin.com/in/maxim-kozlov/"
              target="_blank"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </li>         
          <li>
            <a href="https://github.com/Maximusvin" target="_blank">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://t.me/maximusvin" target="_blank">
              <i class="fab fa-telegram-plane"></i>
            </a>
          </li>
        </ul>

        <div class="image">        
          <img
            class="image__img"
            src=${max}
            alt="Maxim Kozlov"
          />
        </div>
        <div class="lower-content">
          <h3 class="lower-content__title">Maxim Kozlov</h3>
          <div class="lower-content__designation">Scrum Master</div>
        </div>
      </div>
    </div>

    <div class="team__block">
      <div class="inner-box">
        <ul class="social-icons">
          <li>
            <a
              href="https://www.linkedin.com/in/maxim-kozlov/"
              target="_blank"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </li>         
          <li>
            <a href="https://github.com/Maximusvin" target="_blank">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://t.me/maximusvin" target="_blank">
              <i class="fab fa-telegram-plane"></i>
            </a>
          </li>
        </ul>
        <div class="image">
          <img
            class="image__img"
            src=${ivan}
            alt="Ivan Fesenko"
          />
        </div>
        <div class="lower-content">
          <h3 class="lower-content__title">Ivan Fesenko</h3>
          <p class="lower-content__designation">Team lead</p>
        </div>
      </div>
    </div>

    <div class="team__block">
      <div class="inner-box">
        <ul class="social-icons">
          <li>
            <a
              href="https://www.linkedin.com/in/maxim-kozlov/"
              target="_blank"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </li>          
          <li>
            <a href="https://github.com/Maximusvin" target="_blank">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://t.me/maximusvin" target="_blank">
              <i class="fab fa-telegram-plane"></i>
            </a>
          </li>
        </ul>
        <div class="image">
          <img
            class="image__img"
            src=${vadym}
            alt="Vadym Yevlanov"
          />
        </div>
        <div class="lower-content">
          <h3 class="lower-content__title">Vadym Yevlanov</h3>
          <p class="lower-content__designation">Leading developer</p>
        </div>
      </div>
    </div>

    <div class="team__block">
      <div class="inner-box">
        <ul class="social-icons">
          <li>
            <a
              href="https://www.linkedin.com/in/maxim-kozlov/"
              target="_blank"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </li>         
          <li>
            <a href="https://github.com/Maximusvin" target="_blank">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://t.me/maximusvin" target="_blank">
              <i class="fab fa-telegram-plane"></i>
            </a>
          </li>
        </ul>
        <div class="image">
          <img
            class="image__img"
            src=${nikita}
            alt="Nikita Samoilenko"
          />
        </div>
        <div class="lower-content">
          <h3 class="lower-content__title">Nikita Samoilenko</h3>
          <p class="lower-content__designation">Leading developer</p>
        </div>
      </div>
    </div>

    <div class="team__block">
      <div class="inner-box">
        <ul class="social-icons">
          <li>
            <a
              href="https://www.linkedin.com/in/maxim-kozlov/"
              target="_blank"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </li>         
          <li>
            <a href="https://github.com/Maximusvin" target="_blank">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://t.me/maximusvin" target="_blank">
              <i class="fab fa-telegram-plane"></i>
            </a>
          </li>
        </ul>
        <div class="image">
          <img
            class="image__img"
            src=${dima}
            alt="Dima Osipov"
          />
        </div>
        <div class="lower-content">
          <h3 class="lower-content__title">Dima Osipov</h3>
          <p class="lower-content__designation">Leading developer</p>
        </div>
      </div>
    </div>
  </div>
  </div>
`

document.querySelector('.development').addEventListener('click', onShowTeam);

function onShowTeam(e) {
    e.preventDefault();
    clearMovieList();
    refs.mainTitle.innerHTML = 'Our Team';
    refs.movieContainer.classList.remove('grid-container');
    refs.movieContainer.insertAdjacentHTML('beforeend', ourTeam);     
};

