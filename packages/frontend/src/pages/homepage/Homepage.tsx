import React from 'react'
import { ButtonLink } from 'src/components'
import Logo from 'src/assets/logo.svg'
import PeopleIllustration from 'src/assets/people.svg'
import './Homepage.less'

const Homepage: React.FC = () => {
  return (
    <div className="homepage" data-aos="fade-in">
      <section className="homepage__left">
        <img className="homepage__left__logo" src={Logo} alt="Venni Logo" />

        <h2 className="homepage__left__text">
          Connecting millions through chats straight from the browser. For
          people looking for a lightweight alternative to the giants.
        </h2>

        <div className="homepage__left__button-group">
          <ButtonLink
            url="/signup"
            text="Sign up"
            size="large"
            type="primary"
            shape="round"
            icon="rocket"
          />
          <ButtonLink
            url="/login"
            text="Log in"
            size="large"
            type="default"
            shape="round"
            icon="login"
          />
        </div>
      </section>

      <div className="homepage__right">
        <img
          className="homepage__right__img"
          src={PeopleIllustration}
          alt="Group of friends"
        />
      </div>
    </div>
  )
}

export default Homepage
