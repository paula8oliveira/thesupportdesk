import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset } from '../features/tickets/ticketSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

export default function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
  const params = useParams()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  if (isLoading) {
    return <Spinner/>
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }
  
  return (
    <div className='ticket-page'>
      <headerd classNameticket-header>
        <BackButton url='/tickets'/>
        <h2>
          Ticket ID: { ticket._id }
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submited: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <hr/>
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </headerd>
    </div>
  )
}
