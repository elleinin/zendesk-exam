const API_ENDPOINTS = {
    requests: '/api/v2/search.json'
  }

/**
 * getTickets - get requester id from current ticket THEN calls and returns getTicketsbyRequester
 * @param {ZAFClient} client ZAFClient object
 * @param {Boolean} isDefaultSort
 */
export async function getTickets(client, isDefaultSort) {
    const ticket = (await client.get('ticket')).ticket
    const requester = ticket.requester.id
    //console.log(requester)

    const tickets = await getTicketsByRequester(client, requester, isDefaultSort)
    //console.log(tickets)

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
    const tickets = await client.request(API_ENDPOINTS.requests + params)

    return tickets
}