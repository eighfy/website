import { createRoot } from "react-dom/client"
import "./style/index.scss"
import initTypes from "datypes"
initTypes()
const container = document.getElementById("root")!
const root = createRoot(container)

import("./App").then(({ default: App }) => root.render(<App />))
