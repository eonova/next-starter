export const isProduction = process.env.NODE_ENV === 'production'

export const SITE_URL = isProduction ? 'https://eonova.me' : 'http://localhost:3000'

export const GITHUB_USERNAME = 'eonova'

export const SITE_NAME = 'Eonova\'s Space'
export const SITE_TITLE = 'Eonova - A Full Stack Developer'
export const SITE_DESCRIPTION = 'Eonova • Full Stack Developer'
export const SITE_KEYWORDS = ['Eonova', 'eonova', 'Nova Eon', 'Next.js', 'React', 'TypeScript', 'Node.js']
