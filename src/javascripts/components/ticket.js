// TICKET COMPONENT
// Container that displays ticket properties
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Tag } from '@zendeskgarden/react-tags';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { DEFAULT_THEME, PALETTE } from '@zendeskgarden/react-theming'
import PropTypes from "prop-types";
import { formatDate } from '../lib/helpers'
import { getAssignee } from '../lib/actions'

import React,
{
    useState,
    useEffect
} from "react";

const TicketComponent = (props) => {
    const [ticket, setTicket] = useState({});
    const [isHover, setHover] = useState(false);
    const [assignee, setAssignee] = useState("")

    useEffect(() => {
        async function getAssigneeName() {
            const user = await getAssignee(props.client)
            setTimeout(setAssignee(user), 1000)
        }
        getAssigneeName()
        setTicket(props.ticket)
        // console.log(props.ticket); // for testing only
    }, []);

    // Hover handlers
    const MouseOver = () => {
        setHover(true);
    }
    const MouseOut = () => {
        setHover(false);
    }

    // Priority Tagging
    const prioTag = (priority) => {
        let hue
        let title
        switch (priority) {
            case "low":
                hue = "blue";
                title = "Low";
                break;
            case "normal":
                hue = "green";
                title = "Normal";
                break;
            case "high":
                hue = "yellow";
                title = "High";
                break;
            case "urgent":
                hue = "red";
                title = "Urgent";
                break;
            default:
                hue = "grey";
                title = "N/A";
        }
        return (
            <Tag size="small" hue={hue} isPill >
                <span>{title}</span>
            </Tag>
        )
    }

    // const redirect = (id) => {
    //     const path = `/tickets/${id}`
    //     //window only refers to sidebar app viewport -- not sure how to redirect page yet;
    // }

    const styles = {
        wrapper: {
            border: DEFAULT_THEME.borders.sm,
            borderRadius: DEFAULT_THEME.borderRadii.md,
            borderColor: PALETTE.grey[300],
            margin: '5px 0px',
            width: '100%',
        },
        hover: {
            border: DEFAULT_THEME.borders.sm,
            borderRadius: DEFAULT_THEME.borderRadii.md,
            borderColor: PALETTE.azure[600],
            margin: '5px 0px',
            width: '100%',
            backgroundColor: PALETTE.grey[200],
            transition: '0.5s'
        },
        ellipsis: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        },
        padding: {
            padding: '2px 0px'
        }
    }

    return (
        <div className="ticket-wrapper" 
        style={isHover? styles.hover : styles.wrapper} 
        onMouseOver={MouseOver}
        onMouseOut={MouseOut}
        // onClick={() => redirect(ticket.id)}
        >
            <Tooltip placement="start-top" content="Click to view ticket page">
                <Grid>
                    <Row style={styles.padding}>
                        <Col style={styles.ellipsis}>
                        <b>ID:</b> {ticket.id}
                        </Col>
                        <Col style={styles.ellipsis}>
                        <b>Priority:</b> {prioTag(ticket.priority)}
                        </Col>
                    </Row>
                    <Row style={styles.padding}>
                        <Col style={isHover? {} : styles.ellipsis}>
                        <b>Subject:</b> {ticket.subject}
                        </Col>
                    </Row>
                    <Row style={styles.padding}>
                        <Col>
                        <b>Requested:</b> {formatDate(ticket.created_at, !isHover)}
                        </Col>
                        <Col>
                        <b>Updated:</b> {formatDate(ticket.updated_at, !isHover)}
                        </Col>
                    </Row>
                    <Row style={styles.padding}>
                        <Col style={styles.ellipsis}>
                        <b>Assignee:</b> {assignee}
                        </Col>
                        
                    </Row>
                
                </Grid>
            </Tooltip>
        </div>
    )
}

TicketComponent.propTypes = {
    ticket: PropTypes.object,
    client: PropTypes.any
}

export default TicketComponent