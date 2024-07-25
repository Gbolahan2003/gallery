import React from 'react'
import CustomModal from './customModal'

const TestModal = () => {
  return (
<CustomModal title="Upload Image">
    <form>
        <input type="file" accept="image/*" />
        <input type="text" placeholder="Name" />
        <textarea placeholder="Description"></textarea>
        <button type="submit">Upload</button>
    </form>
</CustomModal>
  )
}

export default TestModal