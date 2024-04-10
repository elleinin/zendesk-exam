const API_ENDPOINTS = {
    requests: '/api/v2/search.json'
  }

//@param {String} user // user in for ticket out

/**
 * Set params
 * @param {ZAFClient} client ZAFClient object
 */


//  getTickets - gets requester id from current ID, calls getTicketsByRequester, returns ordered & filtered tickets as object
export async function getTickets(client, isDefaultSort) {
    const ticket = (await client.get('ticket')).ticket
    const requester = ticket.requester.id
    //console.log(requester)

    const tickets = await getTicketsByRequester(client, requester, isDefaultSort)
    //console.log(tickets)

    return tickets
}

async function getTicketsByRequester(client, requester, isDefaultSort) {
    const sortType = isDefaultSort?  'desc' : 'asc'
    const params = `?query=type:ticket+requester:${requester}&sort_by=created_at&sort_order=${sortType}`
    const tickets = await client.request(API_ENDPOINTS.requests + params)

    return tickets
}