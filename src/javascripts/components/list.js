// LIST COMPONENT
// Scrollable content that lists tickets in order
import React,
{
    useState,
    useEffect
} from "react";
import PropTypes from "prop-types";
import { ToggleButton } from '@zendeskgarden/react-buttons';
import { getTickets, getAssignee } from '../lib/actions'
import TicketComponent from "./ticket";

const ListComponent = (props) => {
    const [ticketList, setTicketList] = useState([]); // store array of ticket objects
    const [isDefaultSort, setSortOrder] = useState(true)
    const [assignee, setAssignee] = useState("")

    useEffect(() => {
        async function setTickets() {
            const tickets = (await getTickets(props.client, isDefaultSort)).results
            setTimeout(setTicketList(tickets), 1000)
        }
        async function getAssigneeName() {
            const user = await getAssignee(props.client)
            setTimeout(setAssignee(user), 1000)
        }
        getAssigneeName()
        setTickets()
    }, [isDefaultSort]);

    // Render TicketComponent for each ticket in ticketList
    const TicketList = () => {
        console.log(ticketList) // for testing only
        return ticketList?.map((ticket, i) => {
            return <TicketComponent ticket={ticket} client={props.client} assignee={assignee}key={i}/>;
        });
    };
    // Handler for Sort By toggle
    const setSort = () => {
        let newSort = !isDefaultSort
        setSortOrder(newSort)
    }

    return (
        <div className="list-wrapper">
            <ToggleButton size="small" onClick={() => setSort()}>
                Sort By: {isDefaultSort? "Descending" : "Ascending"}
            </ToggleButton>
            {TicketList()}
        </div>
    )
}

ListComponent.propTypes = {
    client: PropTypes.any
}

export default ListComponent