// LIST COMPONENT
// Scrollable content that lists tickets in order

import React,
{
    useState,
    useEffect
} from "react";
import { ToggleButton } from '@zendeskgarden/react-buttons';
import { getTickets } from '../lib/actions'
import TicketComponent from "./ticket";


const ListComponent = (props) => {
    const [ticketList, setTicketList] = useState([]); // store array of ticket objects
    const [isDefaultSort, setSortOrder] = useState(true)

    useEffect(() => {
        async function setTickets() {
            const tickets = (await getTickets(props.client, isDefaultSort)).results
            setTimeout(setTicketList(tickets), 1000)
        }
        setTickets()
    }, [isDefaultSort]);

    const TicketList = () => {
        console.log(ticketList)
        return ticketList?.map((ticket, i) => {
            return <TicketComponent ticket={ticket} key={i}/>;
        });
    };

    const setSort = () => {
        let newSort = !isDefaultSort
        setSortOrder(newSort)
    }

    const SortButton = () => {
        return isDefaultSort? "Descending" : "Ascending";
    }

    return (
        <div className="list-wrapper">
            <ToggleButton size="small" onClick={() => setSort()}>
                Sort By: {SortButton()}
            </ToggleButton>
            {TicketList()}
        </div>
    )

}

export default ListComponent