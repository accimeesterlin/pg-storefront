import Ticket from "models/Ticket.model";

import { ticketList, messageList } from "../../__server__/__db__/ticket/data";

export const getTicketList = async (): Promise<Ticket[]> => {
  // const response = await axios.get("/api/tickets");
  return ticketList;
};

export const getTicket = async (slug: string): Promise<Ticket> => {
  // const response = await axios.get("/api/tickets/single", { params: { slug } });
  const ticket = ticketList.find((item) => item.slug === slug);
  ticket.conversation = messageList;
  return ticket;
};

export const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  // const response = await axios.get("/api/tickets/slugs");
  const slugs = ticketList.map((item) => ({ params: { slug: item.slug } }));
    
  return slugs;
};

export default { getTicketList, getTicket, getSlugs };
