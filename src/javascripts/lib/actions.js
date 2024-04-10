const API_ENDPOINTS = {
    search: '/api/v2/search.json',
  }

/**
 * getTickets - get requester id from current ticket THEN calls and returns getTicketsbyRequester
 * @param {ZAFClient} client ZAFClient object
 * @param {Boolean} isDefaultSort
 */
export async function getTickets(client, isDefaultSort) {
    const ticket = (await client.get('ticket')).ticket
    const requester = ticket.requester.id
    //console.log(ticket) // for testing only

    const tickets = await getTicketsByRequester(client, requester, isDefaultSort)
    //console.log(tickets) // for testing only

    return tickets
}

/**
 * getTicketsbyRequester - calls search api with requester and sort query parameters
 * @param {ZAFClient} client ZAFClient object
 * @param {Number} requester
 * @param {Boolean} isDefaultSort
 */
async function getTicketsByRequester(client, requester, isDefaultSort) {
    const sortType = isDefaultSort?  'desc' : 'asc'
    const params = `?query=type:ticket+requester:${requester}&sort_by=created_at&sort_order=${sortType}`
    const tickets = await client.request(API_ENDPOINTS.search + params)

    return tickets
}

/**
 * getUserByID
 * @param {ZAFClient} client ZAFClient object
 */
 export async function getAssignee(client) {
    const user = (await client.get('ticket')).ticket.assignee.user.name
    console.log(user) // for testing only
    return user
}