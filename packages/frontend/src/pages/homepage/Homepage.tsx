import React from 'react'
import { useSpring, animated } from 'react-spring'
import Logo from 'src/assets/logo.svg'
import PeopleIllustration from 'src/assets/people.svg'
import { ButtonLink } from 'src/components'
import { interp, useSpringConfig } from './helpers'
import './Homepage.less'

const Homepage: React.FC = () => {
  const { radians } = useSpring(useSpringConfig) as any

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
            href="/signup"
            text="Sign up"
            size="large"
            type="primary"
            shape="round"
            icon="rocket"
          />
          <ButtonLink
            href="/login"
            text="Log in"
            size="large"
            type="default"
            shape="round"
            icon="login"
          />
        </div>
      </section>

      <animated.div
        className="homepage__right"
        style={{ transform: radians.interpolate(interp(1)) }}
      >
        <img
          className="homepage__right__img"
          src={PeopleIllustration}
          alt="Group of friends"
        />
      </animated.div>
    </div>
  )
}

export default Homepage
