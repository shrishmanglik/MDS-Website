export interface IntakeEntity {
  name: string
  description: string
}

export interface IntakeFormData {
  // Step 1: Contact
  name: string
  email: string
  company: string
  // Step 2: Project Basics
  appType: string
  appTypeOther: string
  budgetTier: string
  // Step 3: Scope
  entities: IntakeEntity[]
  deploymentTarget: string
  // Step 4: Integrations
  integrations: string[]
  integrationsOther: string
  notes: string
}

export const INITIAL_FORM_DATA: IntakeFormData = {
  name: '',
  email: '',
  company: '',
  appType: '',
  appTypeOther: '',
  budgetTier: '',
  entities: [{ name: '', description: '' }],
  deploymentTarget: '',
  integrations: [],
  integrationsOther: '',
  notes: '',
}

export const APP_TYPES = [
  'REST API',
  'Web App',
  'Data Pipeline',
  'Mobile App',
  'AI Agent',
  'SaaS Platform',
  'Internal Tool',
  'Other',
] as const

export const BUDGET_TIERS = [
  {
    value: 'starter',
    label: 'Starter',
    price: '$5K \u2013 $15K',
    description: 'Single AI workflow or agent built to your specifications.',
  },
  {
    value: 'professional',
    label: 'Professional',
    price: '$15K \u2013 $50K',
    description: 'Multi-agent system with integrations and dashboards.',
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    price: '$50K+',
    description: 'Full AI infrastructure deployment with SLA guarantees.',
  },
] as const

export const DEPLOYMENT_TARGETS = [
  'Docker',
  'Vercel',
  'AWS',
  'Cloudflare',
  'On-Premise',
  'Not Sure',
] as const

export const INTEGRATIONS = [
  'Authentication',
  'Payments / Stripe',
  'Email / Notifications',
  'Cloud Storage',
  'Database',
  'CRM',
  'Analytics',
  'Calendar / Scheduling',
  'Other',
] as const
