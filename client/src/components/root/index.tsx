import { useState } from 'react'

import Navigation from '../navigation'
import SmartCartAppBar from '../appBar'

export default function Root() {
  const [open, setOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<string>('')

  return (
    <>
      <SmartCartAppBar
        handleOpenMenu={() => setOpen(true)}
        currentPage={currentPage}
      />
      <Navigation
        open={open}
        setOpen={setOpen}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}
