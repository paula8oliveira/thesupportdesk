import { useEffect } from "react"
import {useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

export default function Tickets() {
    const { tickets, isLoading, isSuceess } = useSelector((state)=> state.tickets)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuceess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuceess])

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

  return (
    <div>Tickets</div>
  )
}
