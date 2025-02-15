import { Menu } from '@headlessui/react'
import { TfiTicket } from 'react-icons/tfi'
import { BsFileEarmarkCheck, BsTrash3 } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { setGlobalState } from '../store'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { markSlot } from '../services/blockchain'

const TimeslotActions = ({ slot }) => {
  const handleDelete = () => {
    setGlobalState('slot', slot)
    setGlobalState('deleteSlotModal', 'scale-100')
  }

  const handleCompletion = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await markSlot(slot)
          .then(() => resolve())
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'Marked as completed 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <Menu as="div" className="inline-block text-left">
      <Menu.Button
        className="inline-flex w-full justify-center
          rounded-md bg-black bg-opacity-10 px-4 py-2 text-sm
          font-medium text-black hover:bg-opacity-30 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75"
      >
        <BiDotsVerticalRounded size={17} />
      </Menu.Button>
      <Menu.Items
        className="absolute right-0 mt-2 w-56 origin-top-right
          divide-y divide-gray-100 rounded-md bg-white shadow-md 
          ing-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {!slot.completed && (
          <Menu.Item>
            {({ active }) => (
              <button
                className={`flex justify-start items-center space-x-1 ${
                  active ? 'bg-red-500 text-white' : 'text-red-500'
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={handleDelete}
              >
                <BsTrash3 size={17} />
                <span>Delete</span>
              </button>
            )}
          </Menu.Item>
        )}

        {!slot.completed && slot.seats > 0 && (
          <Menu.Item>
            {({ active }) => (
              <button
                className={`flex justify-start items-center space-x-1 ${
                  active ? 'bg-gray-200 text-black' : 'text-gray-900'
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={handleCompletion}
              >
                <BsFileEarmarkCheck size={17} />
                <span>Finish up</span>
              </button>
            )}
          </Menu.Item>
        )}
        <Menu.Item>
          {({ active }) => (
            <Link
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              to={`/timeslot/${slot.movieId}/${slot.id}`}
            >
              <TfiTicket size={17} />
              <span>All Holders</span>
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default TimeslotActions
