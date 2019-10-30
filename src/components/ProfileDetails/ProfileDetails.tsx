import React, { useState } from 'react'
import { Icon, Button, Upload, message, Popconfirm } from 'antd'
import { UserProfile } from 'src/redux/types'
import { withFirebase } from 'src/firebase'
import { FirebaseCtx } from 'src/firebase/interfaces'
import { validateImage, isValidName } from './validators'

interface Props {
  user: UserProfile
  firebase: FirebaseCtx
}

export const ProfileDetails: React.FC<Props> = (props: Props) => {
  const { user, firebase } = props

  const [isUploading, setIsUploading] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [userName, setUserName] = useState(user.name)

  const handleLogout = async (): Promise<void> => {
    await firebase.auth.signOut()
    window.localStorage.clear()
    window.location.reload()
  }

  const handleInputBlur = () => {
    if (userName.trim() === user.name) {
      setIsEditingName(false)
      return
    }

    if (!isValidName.test(userName)) {
      message.error('Your name must contain only letters!')
      return
    }

    firebase.usersCollection
      .doc(user.id)
      .update({ name: userName.trim() })
      .then(() => {
        setIsEditingName(false)
      })
  }

  const saveToStorage = (params: any) => {
    setIsUploading(true)
    const file: File = params.file

    const metadata = {
      contentType: file.type
    }

    firebase.storage
      .ref(user.id)
      .child('images/profile-picture')
      .put(file, metadata)
      .then(async snapShot => {
        const newAvatar = await snapShot.ref.getDownloadURL()

        firebase.db
          .collection('users')
          .doc(user.id)
          .update({ avatar: newAvatar })
      })
      .catch(err => console.error(err))
      .finally(() => {
        setIsUploading(false)
      })
  }

  return (
    <div className="profile__user-details">
      <img
        className="profile__user-details__image image-250"
        src={user.avatar}
        alt={user.name}
        style={{ opacity: isUploading ? 0.2 : 1 }}
      />
      <Upload
        className="picture-uploader"
        showUploadList={false}
        beforeUpload={validateImage}
        customRequest={saveToStorage}
      >
        <Button icon="upload" />
      </Upload>
      <div className="name-input-container">
        <input
          type="text"
          className={`profile__user-details__name ${
            isEditingName ? ' editing' : ''
          }`}
          placeholder={
            isEditingName ? 'type and click anywhere to save' : user.name
          }
          value={userName}
          onChange={e => setUserName(e.target.value)}
          disabled={!isEditingName}
        />
        {isEditingName ? (
          <Icon type="save" theme="filled" onClick={handleInputBlur} />
        ) : (
          <Icon
            type="edit"
            theme="filled"
            onClick={() => setIsEditingName(true)}
          />
        )}
      </div>
      <p>{user.email}</p>
      <Popconfirm
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={handleLogout}
        title="Are you sure you want to logout?"
        okText="Yes"
        cancelText="No"
      >
        <Button className="ghost-btn-danger" type="danger" ghost>
          Logout
        </Button>
      </Popconfirm>
    </div>
  )
}

const ConnectedProfileDetails = withFirebase(ProfileDetails)

export default ConnectedProfileDetails
