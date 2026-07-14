import { createContext, use, useState, type ReactNode } from 'react'

export type BookingStatus =
  | 'DRAFT'
  | 'HELD'
  | 'PENDING_APPROVAL'
  | 'CONFIRMED'
  | 'MODIFIED'
  | 'CHECKED_IN'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'EXPIRED'
  | 'FAILED'

export type PropertyType = 'hotel' | 'shortlet'
export type BookingSource = 'consumer' | 'corporate'
export type PayoutStatus = 'not_due' | 'queued' | 'processing' | 'processed' | 'on_hold'
export type EscrowState = 'authorized' | 'captured' | 'payout_queued' | 'processed'
export type VerificationTier = 'unverified' | 'basic' | 'verified' | 'trusted'
export type TimelineActor = 'system' | 'guest' | 'host' | 'admin'

export type TimelineEvent = {
  id: string
  at: string
  actor: TimelineActor
  actorName?: string
  description: string
}

export type Booking = {
  id: string
  reference: string
  createdAt: string
  checkIn: string
  checkOut: string
  guestCount: number
  status: BookingStatus
  source: BookingSource
  propertyType: PropertyType
  propertyName: string
  isDoorsManaged: boolean
  hostName: string
  hostRating?: number
  hostCompletedBookings?: number
  guestName: string
  guestEmail: string
  guestVerificationTier: VerificationTier
  priorBookingCount: number
  grossAmount: number
  commissionRate: number
  currency: string
  fxLockRate?: number
  paymentMethod: string
  payoutStatus: PayoutStatus
  payoutDate?: string
  escrowState: EscrowState
  flags: { disputed: boolean; outOfPolicy: boolean; firstTimeGuest: boolean }
  dispute?: {
    reason: string
    evidence: string[]
    slaDeadline: string
    filedBy: TimelineActor
  }
  corporate?: {
    company: string
    policyCompliant: boolean
    approver: string
    invoiceStatus: 'pending' | 'issued' | 'paid'
  }
  cancellation?: { reason: string; cancelledBy: TimelineActor }
  lateOrNoShow?: boolean
  timeline: TimelineEvent[]
}

// Statuses that put a booking in the "Needs Action" queue.
export const NEEDS_ACTION_STATUSES: BookingStatus[] = ['DISPUTED', 'PENDING_APPROVAL', 'FAILED']

const initialBookings: Booking[] = [
  {
    id: 'b1',
    reference: 'DR-48213',
    createdAt: '2026-07-02T09:14:00Z',
    checkIn: '2026-07-10',
    checkOut: '2026-07-14',
    guestCount: 2,
    status: 'DISPUTED',
    source: 'consumer',
    propertyType: 'shortlet',
    propertyName: '3-Bed Duplex, Lekki Phase 1',
    isDoorsManaged: false,
    hostName: 'Nneka Chukwu',
    hostRating: 4.6,
    hostCompletedBookings: 82,
    guestName: 'Ibrahim Suleiman',
    guestEmail: 'ibrahim.suleiman@example.com',
    guestVerificationTier: 'verified',
    priorBookingCount: 3,
    grossAmount: 420000,
    commissionRate: 0.15,
    currency: 'NGN',
    paymentMethod: 'Card •••• 4471',
    payoutStatus: 'on_hold',
    escrowState: 'captured',
    flags: { disputed: true, outOfPolicy: false, firstTimeGuest: false },
    dispute: {
      reason: 'Property materially different from listing photos',
      evidence: ['entrance_photo.jpg', 'living_room_photo.jpg', 'guest_statement.pdf'],
      slaDeadline: '2026-07-15T09:14:00Z',
      filedBy: 'guest',
    },
    timeline: [
      { id: 't1', at: '2026-07-02T09:14:00Z', actor: 'guest', description: 'Booking created and payment authorized' },
      { id: 't2', at: '2026-07-02T09:16:00Z', actor: 'system', description: 'Payment captured, escrow funded' },
      { id: 't3', at: '2026-07-02T09:17:00Z', actor: 'system', description: 'Status changed to CONFIRMED' },
      { id: 't4', at: '2026-07-10T14:02:00Z', actor: 'guest', description: 'Checked in' },
      { id: 't5', at: '2026-07-11T18:40:00Z', actor: 'guest', description: 'Dispute filed: property materially different from listing' },
      { id: 't6', at: '2026-07-11T18:41:00Z', actor: 'system', description: 'Status changed to DISPUTED, payout placed on hold' },
    ],
  },
  {
    id: 'b2',
    reference: 'DR-48219',
    createdAt: '2026-07-05T11:02:00Z',
    checkIn: '2026-07-20',
    checkOut: '2026-07-25',
    guestCount: 4,
    status: 'PENDING_APPROVAL',
    source: 'corporate',
    propertyType: 'hotel',
    propertyName: 'Radisson Blu, Ikeja',
    isDoorsManaged: true,
    hostName: 'Doors',
    guestName: 'Fatima Bello',
    guestEmail: 'fatima.bello@acmecorp.com',
    guestVerificationTier: 'trusted',
    priorBookingCount: 11,
    grossAmount: 980000,
    commissionRate: 0.12,
    currency: 'NGN',
    paymentMethod: 'Corporate Invoice',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    corporate: {
      company: 'Acme Corp Nigeria',
      policyCompliant: true,
      approver: 'Chidi Okafor',
      invoiceStatus: 'pending',
    },
    timeline: [
      { id: 't1', at: '2026-07-05T11:02:00Z', actor: 'guest', description: 'Booking submitted for company approval' },
      { id: 't2', at: '2026-07-05T11:02:30Z', actor: 'system', description: 'Status changed to PENDING_APPROVAL' },
    ],
  },
  {
    id: 'b3',
    reference: 'DR-48166',
    createdAt: '2026-06-29T08:20:00Z',
    checkIn: '2026-07-08',
    checkOut: '2026-07-09',
    guestCount: 1,
    status: 'FAILED',
    source: 'consumer',
    propertyType: 'hotel',
    propertyName: 'Eko Hotel & Suites',
    isDoorsManaged: true,
    hostName: 'Doors',
    guestName: 'Grace Adeyemi',
    guestEmail: 'grace.adeyemi@example.com',
    guestVerificationTier: 'unverified',
    priorBookingCount: 0,
    grossAmount: 145000,
    commissionRate: 0.18,
    currency: 'NGN',
    paymentMethod: 'Card •••• 9021',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: true },
    timeline: [
      { id: 't1', at: '2026-06-29T08:20:00Z', actor: 'guest', description: 'Booking created' },
      { id: 't2', at: '2026-06-29T08:20:45Z', actor: 'system', description: 'Payment authorization failed — insufficient funds' },
      { id: 't3', at: '2026-06-29T08:20:46Z', actor: 'system', description: 'Status changed to FAILED' },
    ],
  },
  {
    id: 'b4',
    reference: 'DR-48022',
    createdAt: '2026-06-20T10:00:00Z',
    checkIn: '2026-07-01',
    checkOut: '2026-07-05',
    guestCount: 2,
    status: 'CONFIRMED',
    source: 'consumer',
    propertyType: 'hotel',
    propertyName: 'Transcorp Hilton, Abuja',
    isDoorsManaged: true,
    hostName: 'Doors',
    guestName: 'Jide Kosoko',
    guestEmail: 'jide.kosoko@example.com',
    guestVerificationTier: 'verified',
    priorBookingCount: 5,
    grossAmount: 310000,
    commissionRate: 0.15,
    currency: 'NGN',
    paymentMethod: 'Card •••• 2231',
    payoutStatus: 'queued',
    escrowState: 'captured',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    timeline: [
      { id: 't1', at: '2026-06-20T10:00:00Z', actor: 'guest', description: 'Booking created and payment authorized' },
      { id: 't2', at: '2026-06-20T10:01:00Z', actor: 'system', description: 'Payment captured, escrow funded' },
      { id: 't3', at: '2026-06-20T10:01:30Z', actor: 'system', description: 'Status changed to CONFIRMED' },
    ],
  },
  {
    id: 'b5',
    reference: 'DR-48250',
    createdAt: '2026-07-08T15:30:00Z',
    checkIn: '2026-07-09',
    checkOut: '2026-07-16',
    guestCount: 3,
    status: 'CHECKED_IN',
    source: 'consumer',
    propertyType: 'shortlet',
    propertyName: '2-Bed Apartment, Victoria Island',
    isDoorsManaged: false,
    hostName: 'Damilare Usman',
    hostRating: 4.9,
    hostCompletedBookings: 214,
    guestName: 'Baba Kaothat',
    guestEmail: 'baba.kaothat@example.com',
    guestVerificationTier: 'verified',
    priorBookingCount: 7,
    grossAmount: 560000,
    commissionRate: 0.15,
    currency: 'NGN',
    paymentMethod: 'Bank Transfer',
    payoutStatus: 'queued',
    escrowState: 'captured',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    timeline: [
      { id: 't1', at: '2026-07-08T15:30:00Z', actor: 'guest', description: 'Booking created and payment authorized' },
      { id: 't2', at: '2026-07-08T15:31:00Z', actor: 'system', description: 'Payment captured, escrow funded' },
      { id: 't3', at: '2026-07-08T15:31:30Z', actor: 'system', description: 'Status changed to CONFIRMED' },
      { id: 't4', at: '2026-07-09T13:05:00Z', actor: 'guest', description: 'Checked in' },
    ],
  },
  {
    id: 'b6',
    reference: 'DR-47810',
    createdAt: '2026-06-10T09:00:00Z',
    checkIn: '2026-06-15',
    checkOut: '2026-06-18',
    guestCount: 2,
    status: 'COMPLETED',
    source: 'consumer',
    propertyType: 'shortlet',
    propertyName: 'Studio, Yaba',
    isDoorsManaged: false,
    hostName: 'Adebayo Salami',
    hostRating: 4.4,
    hostCompletedBookings: 39,
    guestName: 'Oladejo Israel',
    guestEmail: 'oladejo.israel@example.com',
    guestVerificationTier: 'basic',
    priorBookingCount: 0,
    grossAmount: 96000,
    commissionRate: 0.15,
    currency: 'NGN',
    paymentMethod: 'Card •••• 6610',
    payoutStatus: 'processed',
    payoutDate: '2026-06-20T09:00:00Z',
    escrowState: 'processed',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: true },
    timeline: [
      { id: 't1', at: '2026-06-10T09:00:00Z', actor: 'guest', description: 'Booking created and payment authorized' },
      { id: 't2', at: '2026-06-15T14:00:00Z', actor: 'guest', description: 'Checked in' },
      { id: 't3', at: '2026-06-18T11:00:00Z', actor: 'system', description: 'Checked out, status changed to COMPLETED' },
      { id: 't4', at: '2026-06-20T09:00:00Z', actor: 'system', description: 'Payout processed to host' },
    ],
  },
  {
    id: 'b7',
    reference: 'DR-47990',
    createdAt: '2026-06-18T12:00:00Z',
    checkIn: '2026-06-25',
    checkOut: '2026-06-27',
    guestCount: 2,
    status: 'CANCELLED',
    source: 'consumer',
    propertyType: 'shortlet',
    propertyName: '4-Bed Villa, Ikoyi',
    isDoorsManaged: false,
    hostName: 'Desmond Tutu',
    hostRating: 4.7,
    hostCompletedBookings: 56,
    guestName: 'Jibike Alarape',
    guestEmail: 'jibike.alarape@example.com',
    guestVerificationTier: 'verified',
    priorBookingCount: 2,
    grossAmount: 780000,
    commissionRate: 0.15,
    currency: 'NGN',
    paymentMethod: 'Card •••• 3390',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    cancellation: { reason: 'Host unable to accommodate — maintenance issue', cancelledBy: 'host' },
    timeline: [
      { id: 't1', at: '2026-06-18T12:00:00Z', actor: 'guest', description: 'Booking created and payment authorized' },
      { id: 't2', at: '2026-06-22T08:00:00Z', actor: 'host', description: 'Cancelled by host — maintenance issue' },
      { id: 't3', at: '2026-06-22T08:00:30Z', actor: 'system', description: 'Status changed to CANCELLED, refund issued' },
    ],
  },
  {
    id: 'b8',
    reference: 'DR-48280',
    createdAt: '2026-07-09T10:00:00Z',
    checkIn: '2026-07-18',
    checkOut: '2026-07-22',
    guestCount: 6,
    status: 'MODIFIED',
    source: 'corporate',
    propertyType: 'hotel',
    propertyName: 'Sheraton, Lagos',
    isDoorsManaged: true,
    hostName: 'Doors',
    guestName: 'Nneka Chukwu',
    guestEmail: 'nneka.chukwu@globex.com',
    guestVerificationTier: 'trusted',
    priorBookingCount: 18,
    grossAmount: 1240000,
    commissionRate: 0.12,
    currency: 'NGN',
    paymentMethod: 'Corporate Invoice',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    corporate: {
      company: 'Globex Nigeria Ltd',
      policyCompliant: true,
      approver: 'Yemi Adebanjo',
      invoiceStatus: 'issued',
    },
    timeline: [
      { id: 't1', at: '2026-07-09T10:00:00Z', actor: 'guest', description: 'Booking created' },
      { id: 't2', at: '2026-07-09T10:05:00Z', actor: 'admin', actorName: 'Sarah Johnson', description: 'Approved for company travel' },
      { id: 't3', at: '2026-07-09T10:05:30Z', actor: 'system', description: 'Status changed to CONFIRMED' },
      { id: 't4', at: '2026-07-10T09:00:00Z', actor: 'guest', description: 'Date range modified (2 extra nights)' },
      { id: 't5', at: '2026-07-10T09:00:10Z', actor: 'system', description: 'Status changed to MODIFIED' },
    ],
  },
  {
    id: 'b9',
    reference: 'DR-47720',
    createdAt: '2026-06-05T09:00:00Z',
    checkIn: '2026-06-12',
    checkOut: '2026-06-13',
    guestCount: 1,
    status: 'EXPIRED',
    source: 'consumer',
    propertyType: 'shortlet',
    propertyName: '1-Bed Flat, Surulere',
    isDoorsManaged: false,
    hostName: 'Adebanji Bolaji',
    hostRating: 4.1,
    hostCompletedBookings: 12,
    guestName: 'Jerome Bell',
    guestEmail: 'jerome.bell@example.com',
    guestVerificationTier: 'unverified',
    priorBookingCount: 0,
    grossAmount: 45000,
    commissionRate: 0.15,
    currency: 'NGN',
    paymentMethod: 'Card •••• 7788',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: true },
    timeline: [
      { id: 't1', at: '2026-06-05T09:00:00Z', actor: 'guest', description: 'Hold placed, awaiting payment' },
      { id: 't2', at: '2026-06-05T09:30:00Z', actor: 'system', description: 'Hold expired — no payment received' },
      { id: 't3', at: '2026-06-05T09:30:01Z', actor: 'system', description: 'Status changed to EXPIRED' },
    ],
  },
  {
    id: 'b10',
    reference: 'DR-48301',
    createdAt: '2026-07-11T16:45:00Z',
    checkIn: '2026-07-19',
    checkOut: '2026-07-21',
    guestCount: 2,
    status: 'HELD',
    source: 'consumer',
    propertyType: 'shortlet',
    propertyName: '2-Bed Terrace, Ajah',
    isDoorsManaged: false,
    hostName: 'Eze Chinedu',
    hostRating: 4.3,
    hostCompletedBookings: 28,
    guestName: 'Savannah Nguyen',
    guestEmail: 'savannah.nguyen@example.com',
    guestVerificationTier: 'basic',
    priorBookingCount: 1,
    grossAmount: 130000,
    commissionRate: 0.15,
    currency: 'NGN',
    paymentMethod: 'Card •••• 5541',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    timeline: [
      { id: 't1', at: '2026-07-11T16:45:00Z', actor: 'guest', description: 'Hold placed, awaiting payment confirmation' },
    ],
  },
  {
    id: 'b11',
    reference: 'DR-48312',
    createdAt: '2026-07-12T08:10:00Z',
    checkIn: '2026-07-30',
    checkOut: '2026-08-02',
    guestCount: 2,
    status: 'DRAFT',
    source: 'consumer',
    propertyType: 'hotel',
    propertyName: 'Lagos Continental Hotel',
    isDoorsManaged: true,
    hostName: 'Doors',
    guestName: 'Leslie Alexander',
    guestEmail: 'leslie.alexander@example.com',
    guestVerificationTier: 'unverified',
    priorBookingCount: 0,
    grossAmount: 210000,
    commissionRate: 0.18,
    currency: 'NGN',
    paymentMethod: 'Not selected',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: true },
    timeline: [{ id: 't1', at: '2026-07-12T08:10:00Z', actor: 'guest', description: 'Draft booking started' }],
  },
  {
    id: 'b12',
    reference: 'DR-47605',
    createdAt: '2026-06-01T08:00:00Z',
    checkIn: '2026-06-08',
    checkOut: '2026-06-11',
    guestCount: 3,
    status: 'COMPLETED',
    source: 'corporate',
    propertyType: 'hotel',
    propertyName: 'Radisson Blu, Ikeja',
    isDoorsManaged: true,
    hostName: 'Doors',
    guestName: 'Cameron Williamson',
    guestEmail: 'cameron.williamson@initech.com',
    guestVerificationTier: 'trusted',
    priorBookingCount: 9,
    grossAmount: 690000,
    commissionRate: 0.12,
    currency: 'NGN',
    paymentMethod: 'Corporate Invoice',
    payoutStatus: 'processed',
    payoutDate: '2026-06-15T08:00:00Z',
    escrowState: 'processed',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    corporate: {
      company: 'Initech Africa',
      policyCompliant: true,
      approver: 'Peter Gibbons',
      invoiceStatus: 'paid',
    },
    timeline: [
      { id: 't1', at: '2026-06-01T08:00:00Z', actor: 'guest', description: 'Booking created, approved by company' },
      { id: 't2', at: '2026-06-08T14:00:00Z', actor: 'guest', description: 'Checked in' },
      { id: 't3', at: '2026-06-11T11:00:00Z', actor: 'system', description: 'Checked out, status changed to COMPLETED' },
      { id: 't4', at: '2026-06-15T08:00:00Z', actor: 'system', description: 'Payout processed, invoice paid' },
    ],
  },
  {
    id: 'b13',
    reference: 'DR-48005',
    createdAt: '2026-06-19T13:00:00Z',
    checkIn: '2026-06-24',
    checkOut: '2026-06-26',
    guestCount: 2,
    status: 'DISPUTED',
    source: 'consumer',
    propertyType: 'hotel',
    propertyName: 'Eko Hotel & Suites',
    isDoorsManaged: true,
    hostName: 'Doors',
    guestName: 'Guy Hawkins',
    guestEmail: 'guy.hawkins@example.com',
    guestVerificationTier: 'verified',
    priorBookingCount: 4,
    grossAmount: 260000,
    commissionRate: 0.18,
    currency: 'NGN',
    paymentMethod: 'Card •••• 1187',
    payoutStatus: 'on_hold',
    escrowState: 'captured',
    flags: { disputed: true, outOfPolicy: false, firstTimeGuest: false },
    dispute: {
      reason: 'Guest disputes a no-show charge, claims late arrival was pre-approved',
      evidence: ['email_thread.pdf'],
      slaDeadline: '2026-06-27T13:00:00Z',
      filedBy: 'guest',
    },
    lateOrNoShow: true,
    timeline: [
      { id: 't1', at: '2026-06-19T13:00:00Z', actor: 'guest', description: 'Booking created and payment authorized' },
      { id: 't2', at: '2026-06-24T23:59:00Z', actor: 'system', description: 'Marked as no-show, cancellation fee captured' },
      { id: 't3', at: '2026-06-25T09:00:00Z', actor: 'guest', description: 'Dispute filed over no-show charge' },
      { id: 't4', at: '2026-06-25T09:00:20Z', actor: 'system', description: 'Status changed to DISPUTED, payout placed on hold' },
    ],
  },
  {
    id: 'b14',
    reference: 'DR-48298',
    createdAt: '2026-07-10T14:20:00Z',
    checkIn: '2026-07-16',
    checkOut: '2026-07-19',
    guestCount: 2,
    status: 'PENDING_APPROVAL',
    source: 'consumer',
    propertyType: 'shortlet',
    propertyName: '3-Bed Duplex, Lekki Phase 1',
    isDoorsManaged: false,
    hostName: 'Nneka Chukwu',
    hostRating: 4.6,
    hostCompletedBookings: 82,
    guestName: 'Kate Morrison',
    guestEmail: 'kate.morrison@example.com',
    guestVerificationTier: 'basic',
    priorBookingCount: 0,
    grossAmount: 315000,
    commissionRate: 0.15,
    currency: 'NGN',
    paymentMethod: 'Card •••• 4402',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: true, firstTimeGuest: true },
    timeline: [
      { id: 't1', at: '2026-07-10T14:20:00Z', actor: 'guest', description: 'Booking created' },
      { id: 't2', at: '2026-07-10T14:20:15Z', actor: 'system', description: 'Flagged out-of-policy — guest count exceeds listing limit, routed for manual approval' },
    ],
  },
  {
    id: 'b15',
    reference: 'DR-48044',
    createdAt: '2026-06-22T07:30:00Z',
    checkIn: '2026-06-29',
    checkOut: '2026-07-03',
    guestCount: 2,
    status: 'CONFIRMED',
    source: 'consumer',
    propertyType: 'shortlet',
    propertyName: 'Penthouse, Banana Island',
    isDoorsManaged: false,
    hostName: 'Zahir Mays',
    hostRating: 4.95,
    hostCompletedBookings: 301,
    guestName: 'Alec Whitten',
    guestEmail: 'alec.whitten@example.com',
    guestVerificationTier: 'trusted',
    priorBookingCount: 22,
    grossAmount: 1850000,
    commissionRate: 0.1,
    currency: 'NGN',
    fxLockRate: 1580.25,
    paymentMethod: 'Card •••• 9903 (USD)',
    payoutStatus: 'queued',
    escrowState: 'captured',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    timeline: [
      { id: 't1', at: '2026-06-22T07:30:00Z', actor: 'guest', description: 'Booking created, FX rate locked at point of payment' },
      { id: 't2', at: '2026-06-22T07:31:00Z', actor: 'system', description: 'Payment captured, escrow funded' },
      { id: 't3', at: '2026-06-22T07:31:30Z', actor: 'system', description: 'Status changed to CONFIRMED' },
    ],
  },
  {
    id: 'b16',
    reference: 'DR-47890',
    createdAt: '2026-06-14T10:00:00Z',
    checkIn: '2026-06-21',
    checkOut: '2026-06-22',
    guestCount: 5,
    status: 'FAILED',
    source: 'corporate',
    propertyType: 'hotel',
    propertyName: 'Sheraton, Lagos',
    isDoorsManaged: true,
    hostName: 'Doors',
    guestName: 'Anaiah Whitten',
    guestEmail: 'anaiah.whitten@umbrella.com',
    guestVerificationTier: 'verified',
    priorBookingCount: 6,
    grossAmount: 540000,
    commissionRate: 0.12,
    currency: 'NGN',
    paymentMethod: 'Corporate Invoice',
    payoutStatus: 'not_due',
    escrowState: 'authorized',
    flags: { disputed: false, outOfPolicy: false, firstTimeGuest: false },
    corporate: {
      company: 'Umbrella Nigeria',
      policyCompliant: false,
      approver: 'Alice Abernathy',
      invoiceStatus: 'pending',
    },
    timeline: [
      { id: 't1', at: '2026-06-14T10:00:00Z', actor: 'guest', description: 'Booking submitted for approval' },
      { id: 't2', at: '2026-06-14T10:10:00Z', actor: 'admin', actorName: 'Marcus Reid', description: 'Rejected — exceeds per-diem policy limit' },
      { id: 't3', at: '2026-06-14T10:10:10Z', actor: 'system', description: 'Status changed to FAILED' },
    ],
  },
]

function urgencyWeight(status: BookingStatus) {
  if (status === 'DISPUTED') return 0
  if (status === 'PENDING_APPROVAL') return 1
  if (status === 'FAILED') return 2
  return 3
}

type BookingsContextValue = {
  bookings: Booking[]
  needsActionBookings: Booking[]
  cancelBooking: (id: string, reason: string) => void
  resolveDispute: (id: string, resolution: 'release' | 'partial_refund' | 'full_refund', note: string) => void
  approveBooking: (id: string) => void
  addTimelineEvent: (id: string, event: Omit<TimelineEvent, 'id'>) => void
}

const BookingsContext = createContext<BookingsContextValue | null>(null)

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState(initialBookings)

  function addTimelineEvent(id: string, event: Omit<TimelineEvent, 'id'>) {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, timeline: [...b.timeline, { id: crypto.randomUUID(), ...event }] }
          : b,
      ),
    )
  }

  function cancelBooking(id: string, reason: string) {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: 'CANCELLED' as const,
              cancellation: { reason, cancelledBy: 'admin' as const },
              timeline: [
                ...b.timeline,
                {
                  id: crypto.randomUUID(),
                  at: new Date().toISOString(),
                  actor: 'admin' as const,
                  actorName: 'You',
                  description: `Cancelled by admin — ${reason}`,
                },
              ],
            }
          : b,
      ),
    )
  }

  function resolveDispute(id: string, resolution: 'release' | 'partial_refund' | 'full_refund', note: string) {
    const labels = {
      release: 'Funds released to host',
      partial_refund: 'Partial refund issued to guest',
      full_refund: 'Full refund issued to guest',
    }
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: 'COMPLETED' as const,
              flags: { ...b.flags, disputed: false },
              payoutStatus: resolution === 'release' ? ('queued' as const) : ('not_due' as const),
              timeline: [
                ...b.timeline,
                {
                  id: crypto.randomUUID(),
                  at: new Date().toISOString(),
                  actor: 'admin' as const,
                  actorName: 'You',
                  description: `Dispute resolved: ${labels[resolution]}${note ? ` — ${note}` : ''}`,
                },
              ],
            }
          : b,
      ),
    )
  }

  function approveBooking(id: string) {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: 'CONFIRMED' as const,
              timeline: [
                ...b.timeline,
                {
                  id: crypto.randomUUID(),
                  at: new Date().toISOString(),
                  actor: 'admin' as const,
                  actorName: 'You',
                  description: 'Approved by admin, status changed to CONFIRMED',
                },
              ],
            }
          : b,
      ),
    )
  }

  const needsActionBookings = [...bookings]
    .filter((b) => NEEDS_ACTION_STATUSES.includes(b.status))
    .sort((a, b) => urgencyWeight(a.status) - urgencyWeight(b.status))

  const sortedBookings = [...bookings].sort(
    (a, b) => urgencyWeight(a.status) - urgencyWeight(b.status),
  )

  return (
    <BookingsContext
      value={{
        bookings: sortedBookings,
        needsActionBookings,
        cancelBooking,
        resolveDispute,
        approveBooking,
        addTimelineEvent,
      }}
    >
      {children}
    </BookingsContext>
  )
}

export function useBookings() {
  const context = use(BookingsContext)
  if (!context) throw new Error('useBookings must be used within a BookingsProvider')
  return context
}
