# About this library
The `uicomposition` library enables you to compose multiple Autonomous Services together through their User Interfaces, regardless of their chosen web stack.

# Idea
By restricting communication between Autonomous Services to using event based architecture and communication through their UIs, multiple teams can work on distinct parts of a system without interfering with eachother.

## Architecture
For each service, one ore many /components/ are published as a means of communicated with the service. An `Address` service (being the authoritative source of /address information/) could, for example, publish a `select-address` component for one of its registered, internal /contacts/ (a domain concern). Other services needing to associate their contacts (say /customer/s) with an address, could ask their end-user to select an address, through one of `Address` services' interfaces. 

# See the wiki for more!
https://github.com/samilamti/uicomposition/wiki
