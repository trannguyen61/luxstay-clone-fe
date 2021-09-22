import { BREAKPOINTS } from '../consts/mediaConsts'

export function isXsScreen() {
    if (window.innerWidth < BREAKPOINTS.sm) return true
    return false
}

export function isSmOrBelowScreen() {
    if (window.innerWidth < BREAKPOINTS.md) return true
    return false
}

export function isMdOrBelowScreen() {
    if (window.innerWidth < BREAKPOINTS.lg) return true
    return false
}

export function isLgOrBelowScreen() {
    if (window.innerWidth < BREAKPOINTS.xl) return true
    return false
}

export function isSmOrAboveScreen() {
    if (window.innerWidth >= BREAKPOINTS.sm) return true
    return false
}

export function isMdOrAboveScreen() {
    if (window.innerWidth >= BREAKPOINTS.md) return true
    return false
}

export function isLgOrAboveScreen() {
    if (window.innerWidth >= BREAKPOINTS.lg) return true
    return false
}

export function isXlScreen() {
    if (window.innerWidth >= BREAKPOINTS.xl) return true
    return false
}