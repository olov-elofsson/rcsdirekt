// English translation of ../customer-examples.ts. It must keep the same structure (steps, branching,
// icons and `opens` semantics) as the Swedish module; only the user-visible strings differ.
import type { Choice, Step, Scenario } from "../customer-examples";
import workshopUrl from "@/assets/foto-verkstad.webp";
import workshopUrlSmall from "@/assets/foto-verkstad-800.webp";
import courseUrl from "@/assets/foto-utbildning.webp";
import courseUrlSmall from "@/assets/foto-utbildning-800.webp";
import carDealerUrl from "@/assets/foto-bilhandel.webp";
import carDealerUrlSmall from "@/assets/foto-bilhandel-800.webp";
import bowlingUrl from "@/assets/foto-bowling.webp";
import bowlingUrlSmall from "@/assets/foto-bowling-800.webp";
import restaurantUrl from "@/assets/foto-restaurang.webp";
import restaurantUrlSmall from "@/assets/foto-restaurang-800.webp";

const calendar: Choice = { label: "Add to calendar", icon: "event", opens: "the calendar" };
const map: Choice = { label: "Get directions", icon: "open", opens: "the map" };

/* Big Bowl: a lane booked in the thread, with food added and the time in the calendar. */
const laneDone = (text: string): Step => ({ text, chips: [calendar, map] });
const laneBooked = (time: string): Step => ({
  text: `Done! You have lane 4 at ${time} on Friday. Would you like to add food?`,
  chips: [
    { label: "Yes, please", next: laneDone("We have added food for your group. Welcome!") },
    { label: "No thanks", next: laneDone("Great, welcome!") },
  ],
});

/* Kebabfabriken: the customer club, with a sign-up bonus, coupons, weekly offers and points. */
const coupon = (what: string, code: string): Step => ({
  card: {
    title: `Coupon: ${what}`,
    body: `Show the code ${code} at checkout. Valid for 30 days.`,
    actions: [calendar, map],
  },
  chips: [{ label: "My points", next: { text: "You have 120 points. At 200 points we treat you to a dish of your choice.", chips: [map] } }],
});
const weeklyOffers: Step = {
  text: "This week's offers for members:",
  carousel: [
    { title: "Two kebab plates", body: "Pay for one, get the other at half price.", actions: [{ label: "Get coupon", next: coupon("two kebab plates", "KF-2210") }] },
    { title: "Family pack", body: "20% off all week.", actions: [{ label: "Get coupon", next: coupon("family pack", "KF-3407") }] },
    { title: "Lunch with a drink", body: "A drink is included with the lunch of the day.", actions: [{ label: "Get coupon", next: coupon("lunch with a drink", "KF-5518") }] },
  ],
};

/* Maptun: a carousel of services with pictures, booking, directions and a reminder. */
const workshopBooked = (day: string): Step => ({
  card: {
    title: `Booked ${day} at 8:00`,
    body: "Drop off the car from 7:30. We'll get in touch when it's ready.",
    actions: [map, calendar],
  },
  chips: [
    {
      label: "Remind me the day before",
      next: { text: "We will. We'll send a reminder with the address and directions the day before.", chips: [map] },
    },
  ],
});
const bookWorkshop: Choice = {
  label: "Book a time",
  next: {
    text: "We have open slots in the workshop. Which day works?",
    chips: [
      { label: "Tuesday", next: workshopBooked("Tuesday") },
      { label: "Thursday", next: workshopBooked("Thursday") },
    ],
  },
};

/* Nercia: a welcome with a picture, what to bring, and a question. */
const courseInfo: Step = {
  text: "Great! Here is what you need for the first day.",
  carousel: [
    { title: "Schedule", body: "Weeks 1 and 2", actions: [{ label: "Open the schedule", icon: "open", opens: "the schedule" }] },
    { title: "Bring", body: "ID and a laptop", actions: [{ label: "Read more", icon: "open", opens: "nercia.se" }] },
    { title: "Finding us", body: "Entrance from the parking lot", actions: [map] },
  ],
  chips: [
    {
      label: "I have a question",
      next: {
        text: "Pick a common question or write your own, and a teacher will answer before the course starts.",
        chips: [
          { label: "Is there parking?", next: { text: "Yes, there is free parking at the entrance.", chips: [map] } },
          { label: "Can I eat lunch there?", next: { text: "Yes, there is a restaurant in the building. Lunch is included on the first day." } },
        ],
      },
    },
    { label: "All set", next: { text: "See you on Monday at 9:00!" } },
  ],
};

/* Bilia: an invitation with a photo, sign-up, and a test drive. */
const testDriveBooked = (time: string): Step => ({
  text: `Done! Your test drive is Thursday at ${time}. The car will be ready at the entrance.`,
  chips: [calendar],
});
const signedUp: Step = {
  card: {
    title: "You're signed up!",
    body: "Would you like to test drive the new model the same evening?",
    actions: [
      {
        label: "Book a test drive",
        next: { text: "Which time works?", chips: [{ label: "17:30", next: testDriveBooked("17:30") }, { label: "19:00", next: testDriveBooked("19:00") }] },
      },
      { label: "No thanks", next: { text: "Okay, see you on Thursday!", chips: [calendar] } },
    ],
  },
};

export const scenarios: Scenario[] = [
  {
    customer: "Maptun",
    company: "Maptun Performance AB",
    title: "Services to swipe between",
    copy: "A carousel with one button per service. The time is booked in the same conversation, with directions and a reminder.",
    photo: { src: workshopUrl, small: workshopUrlSmall, alt: "A black Saab in the Maptun workshop, connected to a dynamometer", position: "50% 60%" },
    start: {
      text: "Hi! Time for something new for your car? Here are three of our services.",
      carousel: [
        { title: "Engine tuning", body: "Software tailored to your car.", actions: [bookWorkshop, { label: "Read more", icon: "open", opens: "maptun.se" }] },
        { title: "Power measurement", body: "See the power on our dyno.", actions: [bookWorkshop, { label: "Read more", icon: "open", opens: "maptun.se" }] },
        { title: "Diagnostics", body: "We read the car's fault codes.", actions: [bookWorkshop, { label: "Read more", icon: "open", opens: "maptun.se" }] },
      ],
    },
  },
  {
    customer: "Nercia",
    company: "NERCIA Utbildning Aktiebolag",
    title: "Welcome message before the course starts",
    copy: "Time and place, a button to accept, and what the participant needs for the first day as cards to swipe between.",
    photo: { src: courseUrl, small: courseUrlSmall, alt: "The Nercia name printed in blue on textured paper", position: "50% 50%", messageAt: "right" },
    start: {
      card: {
        title: "Welcome to the course!",
        body: "We start Monday at 9:00. Welcome coffee from 8:30.",
        actions: [{ label: "I'm coming", next: courseInfo }, map],
      },
    },
  },
  {
    customer: "Bilia",
    company: "Bilia AB",
    title: "Invitation with sign-up in the message",
    copy: "The guest signs up with one tap, books a test drive the same evening and adds the time to the calendar.",
    photo: { src: carDealerUrl, small: carDealerUrlSmall, alt: "A Bilia sign on a glass facade against a blue sky", position: "50% 30%" },
    start: {
      card: {
        title: "Join us for the premiere evening",
        body: "See the new models Thursday at 18:00 at our showroom.",
        actions: [
          {
            label: "Sign me up",
            next: {
              text: "Great! How many of you are coming?",
              chips: ["1", "2", "3 or more"].map((count) => ({ label: count, next: signedUp })),
            },
          },
          { label: "See the new model", icon: "open", opens: "bilia.se" },
        ],
      },
    },
  },
  {
    customer: "Big Bowl",
    company: "Big Bowl Sverige AB",
    title: "Book a lane in the message",
    copy: "The customer picks a time, adds food and gets the time in the calendar and the way there, without leaving the thread.",
    photo: { src: bowlingUrl, small: bowlingUrlSmall, alt: "A bowling ball knocking down pins on a glossy lane", position: "50% 50%" },
    start: {
      card: {
        title: "Open lanes on Friday",
        body: "Bowl with friends or colleagues. Book right here.",
        actions: [
          {
            label: "Book a lane",
            next: {
              text: "Which time works?",
              chips: ["18:00", "19:00", "20:00"].map((time) => ({ label: time, next: laneBooked(time) })),
            },
          },
          { label: "See the menu", icon: "open", opens: "bigbowl.se" },
        ],
      },
    },
  },
  {
    customer: "Kebabfabriken",
    company: "Kebabfabriken AB",
    title: "Customer club with coupons and bonus",
    copy: "New members get a welcome bonus, and everyone gets this week's offers, coupons and points right in the message.",
    photo: { src: restaurantUrl, small: restaurantUrlSmall, alt: "Guests eating in a restaurant with plants and books on the shelves", position: "50% 50%" },
    start: {
      card: {
        title: "Welcome to the customer club!",
        body: "Thanks for joining. Your welcome bonus is a free drink on your next visit.",
        actions: [
          { label: "Get the bonus", next: coupon("free drink", "KF-1001") },
          { label: "This week's offers", next: weeklyOffers },
        ],
      },
    },
  },
];
