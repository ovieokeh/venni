import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Button } from 'antd'
import Logo from 'src/assets/logo.svg'
import PeopleIllustration from 'src/assets/people.svg'
import { interp, useSpringConfig } from './helpers'
import './Homepage.less'

const Homepage: React.FC = () => {
  const { radians } = useSpring(useSpringConfig) as any

  return (
    <div className="homepage">
      <section className="homepage__left">
        <img className="homepage__left__logo" src={Logo} alt="Venni Logo" />

        <h2 className="homepage__left__text">
          Connecting millions through chats straight from the browser. For
          people looking for a lightweight alternative to the giants.
        </h2>
        <div className="homepage__left__button-group">
          <Button size="large" type="primary" shape="round" icon="rocket">
            Sign Up
          </Button>
          <Button size="large" type="default" shape="round" icon="unlock">
            Log in
          </Button>
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
