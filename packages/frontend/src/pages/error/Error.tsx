import React from 'react'
import { Button, Icon } from 'antd'
import { History } from 'history'
import './Error.less'

const goBack = (history: History) => () => history.goBack()

interface ErrorProps {
  history: History
}

const Error: React.FC<ErrorProps> = ({ history }) => {
  window.document.title = "Something's Wrong - Venni"

  return (
    <div className="notfound">
      <Icon
        type="bug"
        className="notfound__icon"
        data-aos="fade-down"
        data-aos-duration="200"
      />

      <div
        className="notfound__main"
        data-aos="fade-up"
        data-aos-duration="200"
      >
        <h3 className="notfound__main__h3">An Error Occurred!</h3>
        <p className="notfound__main__p">
          The page you're looking for doesn't exist or some other error
          occurred.
        </p>
        <Button icon="left-circle" onClick={goBack(history)}>
          Go back
        </Button>
      </div>
    </div>
  )
}

export default Error
