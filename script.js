// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded")
  
    // ===== UI Elements =====
  
    // Loading overlay
    const loadingOverlay = document.getElementById("loading-overlay")
  
    // User profile
    const userAvatar = document.getElementById("user-avatar")
    const userName = document.getElementById("user-name")
    const userEmail = document.getElementById("user-email")
    const welcomeName = document.getElementById("welcome-name")
    const lastLogin = document.getElementById("last-login")
  
    // Navigation
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
    const mobileMenu = document.getElementById("mobile-menu")
    const userDropdownToggle = document.getElementById("user-avatar")
    const userDropdown = document.getElementById("user-dropdown")
  
    // Tool navigation
    const sidebarLinks = document.querySelectorAll(".sidebar-link")
    const toolSelect = document.getElementById("tool-select")
    const toolSections = document.querySelectorAll(".tool-section")
  
    // Tab navigation
    const tabTriggers = document.querySelectorAll(".tab-trigger")
  
    // Welcome banner
    const welcomeBanner = document.getElementById("welcome-banner")
    const closeBanner = document.getElementById("close-banner")
  
    // Logout
    const logoutButton = document.getElementById("logout-button")
    const logoutModal = document.getElementById("logout-modal")
    const closeModal = document.getElementById("close-modal")
    const cancelLogout = document.getElementById("cancel-logout")
    const confirmLogout = document.getElementById("confirm-logout")
  
    // Email generator
    const generateEmailBtn = document.getElementById("generate-email")
    const emailOutputContainer = document.getElementById("email-output-container")
    const emailOutput = document.getElementById("email-output")
    const copyEmailBtn = document.getElementById("copy-email")
  
    // Poster creator
    const createPosterBtn = document.getElementById("create-poster")
    const posterTitle = document.getElementById("poster-title")
    const posterThemeBadge = document.getElementById("poster-theme-badge")
    const posterDate = document.getElementById("poster-date")
    const posterTime = document.getElementById("poster-time")
    const posterVenue = document.getElementById("poster-venue")
    const downloadPosterBtn = document.getElementById("download-poster")
  
    // Task assigner
    const assignTasksBtn = document.getElementById("assign-tasks")
    const taskOutputContainer = document.getElementById("task-output-container")
    const assignmentsList = document.getElementById("assignments-list")
    const exportAssignmentsBtn = document.getElementById("export-assignments")
    const saveAssignmentsBtn = document.getElementById("save-assignments")
  
    // Event ideas
    const suggestEventsBtn = document.getElementById("suggest-events")
    const ideasOutputContainer = document.getElementById("ideas-output-container")
    const ideasList = document.getElementById("ideas-list")
    const exportIdeasBtn = document.getElementById("export-ideas")
    const saveIdeasBtn = document.getElementById("save-ideas")
  
    // Toast notification
    const toast = document.getElementById("toast")
    const toastTitle = document.getElementById("toast-title")
    const toastMessage = document.getElementById("toast-message")
  
    // Invitation type selectors
    const gmailOption = document.getElementById("gmail-option")
    const whatsappOption = document.getElementById("whatsapp-option")
    const recipientInfo = document.getElementById("recipient-info")
    const recipientLabel = document.getElementById("recipient-label")
    const recipientEmail = document.getElementById("recipientEmail")
    const generateButtonText = document.getElementById("generate-button-text")
    const sendInvitationBtn = document.getElementById("send-invitation")
  
    // Current invitation type
    let currentInvitationType = "gmail"
  
    // Hide loading overlay
    if (loadingOverlay) {
      loadingOverlay.classList.add("hidden")
    }
  
    // ===== Navigation =====
  
    // Mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
  
        // Toggle icon between bars and X
        const icon = mobileMenuToggle.querySelector("i")
        if (icon.classList.contains("fa-bars")) {
          icon.classList.remove("fa-bars")
          icon.classList.add("fa-times")
        } else {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      })
    }
  
    // User dropdown toggle
    if (userDropdownToggle) {
      userDropdownToggle.addEventListener("click", () => {
        userDropdown.classList.toggle("active")
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", (event) => {
        if (!userDropdownToggle.contains(event.target) && !userDropdown.contains(event.target)) {
          userDropdown.classList.remove("active")
        }
      })
    }
  
    // Close welcome banner
    if (closeBanner) {
      closeBanner.addEventListener("click", () => {
        welcomeBanner.classList.add("hidden")
  
        // Save preference to localStorage
        localStorage.setItem("hideBanner", "true")
      })
  
      // Check if banner should be hidden
      if (localStorage.getItem("hideBanner") === "true") {
        welcomeBanner.classList.add("hidden")
      }
    }
  
    // Tool navigation via sidebar
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")
  
        // Update active sidebar link
        sidebarLinks.forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")
  
        // Update mobile select
        if (toolSelect) {
          toolSelect.value = tabId
        }
  
        // Show the corresponding tool section
        toolSections.forEach((section) => {
          section.classList.add("hidden")
        })
        document.getElementById(`${tabId}-tool`).classList.remove("hidden")
      })
    })
  
    // Tool navigation via mobile select
    if (toolSelect) {
      toolSelect.addEventListener("change", function () {
        const tabId = this.value
  
        // Update active sidebar link (for when screen size changes)
        sidebarLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("data-tab") === tabId) {
            link.classList.add("active")
          }
        })
  
        // Show the corresponding tool section
        toolSections.forEach((section) => {
          section.classList.add("hidden")
        })
        document.getElementById(`${tabId}-tool`).classList.remove("hidden")
      })
    }
  
    // Tab navigation
    tabTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")
        const tabsContainer = this.closest(".tabs")
  
        // Update active tab trigger
        const triggers = tabsContainer.querySelectorAll(".tab-trigger")
        triggers.forEach((t) => {
          t.classList.remove("active")
        })
        this.classList.add("active")
  
        // Show the corresponding tab content
        const contents = tabsContainer.querySelectorAll(".tab-content")
        contents.forEach((content) => {
          content.classList.remove("active")
        })
        tabsContainer.querySelector(`#${tabId}`).classList.add("active")
      })
    })
  
    // ===== Logout Functionality =====
  
    // Show logout confirmation modal
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault()
        logoutModal.classList.remove("hidden")
      })
    }
  
    // Close logout modal
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        logoutModal.classList.add("hidden")
      })
    }
  
    // Cancel logout
    if (cancelLogout) {
      cancelLogout.addEventListener("click", () => {
        logoutModal.classList.add("hidden")
      })
    }
  
    // Confirm logout
    if (confirmLogout) {
      confirmLogout.addEventListener("click", () => {
        // Show loading overlay
        if (loadingOverlay) {
          loadingOverlay.classList.remove("hidden")
        }
  
        // Simulate logout (since we removed Firebase auth)
        setTimeout(() => {
          showToast("Logged Out", "You have been successfully logged out.", "success")
  
          // Redirect to login page or reload the current page
          // window.location.href = "login.html"
  
          // For demo purposes, just hide the modal and loading overlay
          logoutModal.classList.add("hidden")
          loadingOverlay.classList.add("hidden")
        }, 1000)
      })
    }
  
    // ===== Invitation Type Selection =====
    if (gmailOption && whatsappOption) {
      gmailOption.addEventListener("click", () => {
        currentInvitationType = "gmail"
        gmailOption.classList.add("active")
        whatsappOption.classList.remove("active")
        recipientLabel.textContent = "Recipient Email"
        recipientEmail.type = "email"
        recipientEmail.placeholder = "Enter recipient email"
        generateButtonText.textContent = "Generate Email Invitation"
      })
  
      whatsappOption.addEventListener("click", () => {
        currentInvitationType = "whatsapp"
        whatsappOption.classList.add("active")
        gmailOption.classList.remove("active")
        recipientLabel.textContent = "WhatsApp Number"
        recipientEmail.type = "tel"
        recipientEmail.placeholder = "Enter WhatsApp number with country code"
        generateButtonText.textContent = "Generate WhatsApp Message"
      })
    }
  
    // Send invitation button
    if (sendInvitationBtn) {
      sendInvitationBtn.addEventListener("click", () => {
        const recipient = recipientEmail.value.trim()
  
        if (!recipient) {
          showToast(
            "Error",
            `Please enter a ${currentInvitationType === "gmail" ? "recipient email" : "WhatsApp number"}`,
            "error",
          )
          return
        }
  
        if (currentInvitationType === "gmail") {
          // Open default email client with the generated email
          const subject = `Invitation: ${document.getElementById("eventName").value || "[Event Name]"} - ${document.getElementById("eventDate").value || "[Date]"}`
          const body = emailOutput.textContent
          window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
          showToast(
            "Email Client Opened",
            "Your invitation email has been prepared in your default email client.",
            "success",
          )
        } else {
          // Open WhatsApp with the generated message
          const message = emailOutput.textContent
          let whatsappNumber = recipient.replace(/\D/g, "") // Remove non-numeric characters
  
          // Ensure the number starts with a plus sign if it doesn't
          if (!whatsappNumber.startsWith("+")) {
            whatsappNumber = "+" + whatsappNumber
          }
  
          window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
          showToast("WhatsApp Opening", "Your invitation message is being prepared for WhatsApp.", "success")
        }
      })
    }
  
    // ===== Email Generator =====
    if (generateEmailBtn) {
      generateEmailBtn.addEventListener("click", () => {
        const eventName = document.getElementById("eventName").value || "[Event Name]"
        const eventDate = document.getElementById("eventDate").value || "[Date]"
        const eventLocation = document.getElementById("eventLocation").value || "[Location]"
        const eventAgenda = document.getElementById("eventAgenda").value || "[Agenda details will be provided here]"
        const recipient = recipientEmail.value.trim()
  
        let message = ""
  
        if (currentInvitationType === "gmail") {
          // Generate email format
          message = `Subject: Invitation: ${eventName} - ${eventDate}
  
  Dear Team Members,
  
  We are pleased to invite you to our upcoming event "${eventName}".
  
  EVENT DETAILS:
  • Date: ${eventDate}
  • Location: ${eventLocation}
  • Registration: Required (RSVP by responding to this email)
  
  AGENDA:
  ${eventAgenda}
  
  This event presents an excellent opportunity for networking and professional development. Your participation would be highly valued.
  
  Please confirm your attendance by replying to this email no later than [RSVP Date].
  
  Best regards,
  ${userName ? userName.textContent : "ClubMate User"}
  ClubMate Enterprise`
        } else {
          // Generate WhatsApp format (more concise)
          message = `🎉 *INVITATION: ${eventName}* 🎉
  
  Hello! You're invited to our upcoming event:
  
  📅 *Date:* ${eventDate}
  📍 *Location:* ${eventLocation}
  
  *About the event:*
  ${eventAgenda}
  
  We hope you can join us! Please confirm your attendance.
  
  Regards,
  ${userName ? userName.textContent : "ClubMate User"}`
        }
  
        emailOutput.textContent = message
        emailOutputContainer.classList.remove("hidden")
  
        // Save to localStorage
        const invitationData = {
          type: currentInvitationType,
          eventName,
          eventDate,
          eventLocation,
          eventAgenda,
          recipient,
          generatedMessage: message,
          createdAt: new Date().toISOString(),
        }
  
        // Get existing invitations or initialize empty array
        const savedInvitations = JSON.parse(localStorage.getItem("clubmate_invitations") || "[]")
        savedInvitations.push(invitationData)
        localStorage.setItem("clubmate_invitations", JSON.stringify(savedInvitations))
  
        showToast(
          currentInvitationType === "gmail" ? "Email Generated" : "WhatsApp Message Generated",
          `Your professional ${currentInvitationType === "gmail" ? "email" : "WhatsApp message"} has been created successfully.`,
          "success",
        )
      })
    }
  
    // Copy email to clipboard
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener("click", () => {
        const text = emailOutput.textContent
        navigator.clipboard
          .writeText(text)
          .then(() => {
            showToast("Copied to Clipboard", "Content has been copied to your clipboard.", "success")
  
            // Show check icon temporarily
            const icon = copyEmailBtn.querySelector("i")
            if (icon) {
              icon.classList.remove("fa-copy")
              icon.classList.add("fa-check")
              icon.style.color = "#10b981" // Success color
  
              setTimeout(() => {
                icon.classList.remove("fa-check")
                icon.classList.add("fa-copy")
                icon.style.color = "" // Reset color
              }, 2000)
            }
          })
          .catch((err) => {
            console.error("Could not copy text: ", err)
            showToast("Error", "Failed to copy to clipboard.", "error")
          })
      })
    }
  
    // ===== Poster Creator =====
    if (createPosterBtn) {
      createPosterBtn.addEventListener("click", () => {
        const title = document.getElementById("eventTitle").value
        const theme = document.getElementById("eventTheme").value
        const date = document.getElementById("posterDate").value
        const time = document.getElementById("posterTime").value
        const venue = document.getElementById("posterVenue").value
  
        // Update poster preview
        if (title) posterTitle.textContent = title
        if (theme) posterThemeBadge.textContent = theme.charAt(0).toUpperCase() + theme.slice(1)
        if (date) posterDate.textContent = date
        if (time) posterTime.textContent = time
        if (venue) posterVenue.textContent = venue
  
        // Save to localStorage instead of Firestore
        const posterData = {
          title: title || posterTitle.textContent,
          theme: theme || "corporate",
          date: date || posterDate.textContent,
          time: time || posterTime.textContent,
          venue: venue || posterVenue.textContent,
          createdAt: new Date().toISOString(),
        }
  
        // Get existing posters or initialize empty array
        const savedPosters = JSON.parse(localStorage.getItem("clubmate_posters") || "[]")
        savedPosters.push(posterData)
        localStorage.setItem("clubmate_posters", JSON.stringify(savedPosters))
  
        showToast("Poster Created", "Your professional poster has been generated and is ready for download.", "success")
      })
    }
  
    // Download poster (placeholder functionality)
    if (downloadPosterBtn) {
      downloadPosterBtn.addEventListener("click", () => {
        showToast("Download Started", "Your poster is being prepared for download.", "success")
  
        // This is a placeholder. In a real application, you would implement
        // actual download functionality, possibly using html2canvas or similar
      })
    }
  
    // ===== Task Assigner =====
    if (assignTasksBtn) {
      assignTasksBtn.addEventListener("click", () => {
        const members = document
          .getElementById("members")
          .value.split(",")
          .map((m) => m.trim())
          .filter((m) => m)
  
        const tasks = document
          .getElementById("tasks")
          .value.split(",")
          .map((t) => t.trim())
          .filter((t) => t)
  
        if (members.length === 0 || tasks.length === 0) {
          showToast("Input Required", "Please enter at least one member and one task", "error")
          return
        }
  
        // Clear previous assignments
        assignmentsList.innerHTML = ""
  
        // Create new assignments
        const assignments = []
        for (let i = 0; i < Math.min(members.length, tasks.length); i++) {
          assignments.push({ member: members[i], task: tasks[i] })
  
          // Create assignment row
          const row = document.createElement("div")
          row.className = "assignment-row"
  
          // Member info
          const memberInfo = document.createElement("div")
          memberInfo.className = "member-info"
  
          const avatar = document.createElement("div")
          avatar.className = "member-avatar"
          const initials = members[i]
            .split(" ")
            .map((n) => n[0])
            .join("")
          avatar.textContent = initials
  
          const memberName = document.createElement("span")
          memberName.textContent = members[i]
  
          memberInfo.appendChild(avatar)
          memberInfo.appendChild(memberName)
  
          // Arrow
          const arrow = document.createElement("div")
          arrow.className = "assignment-arrow"
          arrow.innerHTML = '<i class="fas fa-chevron-right"></i>'
  
          // Task
          const task = document.createElement("div")
          task.className = "assignment-task"
          task.textContent = tasks[i]
  
          // Add all elements to row
          row.appendChild(memberInfo)
          row.appendChild(arrow)
          row.appendChild(task)
  
          // Add row to list
          assignmentsList.appendChild(row)
        }
  
        // Show the assignments container
        taskOutputContainer.classList.remove("hidden")
  
        showToast("Tasks Assigned", `Successfully assigned ${assignments.length} tasks to team members.`, "success")
      })
    }
  
    // Save assignments to localStorage
    if (saveAssignmentsBtn) {
      saveAssignmentsBtn.addEventListener("click", () => {
        const assignments = []
        const rows = assignmentsList.querySelectorAll(".assignment-row")
  
        rows.forEach((row) => {
          const member = row.querySelector(".member-info span").textContent
          const task = row.querySelector(".assignment-task").textContent
          assignments.push({ member, task })
        })
  
        if (assignments.length === 0) {
          showToast("No Assignments", "There are no assignments to save", "error")
          return
        }
  
        // Save to localStorage
        const assignmentData = {
          assignments,
          createdAt: new Date().toISOString(),
        }
  
        // Get existing assignments or initialize empty array
        const savedAssignments = JSON.parse(localStorage.getItem("clubmate_assignments") || "[]")
        savedAssignments.push(assignmentData)
        localStorage.setItem("clubmate_assignments", JSON.stringify(savedAssignments))
  
        showToast("Assignments Saved", "Your task assignments have been saved successfully", "success")
      })
    }
  
    // Export assignments (placeholder functionality)
    if (exportAssignmentsBtn) {
      exportAssignmentsBtn.addEventListener("click", () => {
        showToast("Export Started", "Your assignments are being prepared for export.", "success")
  
        // This is a placeholder. In a real application, you would implement
        // actual export functionality, possibly to CSV or PDF
      })
    }
  
    // ===== Event Ideas Generator =====
    if (suggestEventsBtn) {
      suggestEventsBtn.addEventListener("click", () => {
        const clubType = document.getElementById("clubType").value
        const audience = document.getElementById("audience").value
        const budget = document.getElementById("budget").value
  
        // Event ideas data
        const ideas = {
          tech: {
            professionals: [
              "Industry 4.0 Conference & Exhibition",
              "AI Implementation Workshop Series",
              "Cybersecurity Summit",
              "Digital Transformation Masterclass",
              "Tech Leadership Roundtable",
              "Cloud Migration Strategy Session",
              "Data Analytics for Business Decisions",
            ],
            students: [
              "24-Hour Hackathon Challenge",
              "Tech Career Fair",
              "Coding Competition",
              "Startup Pitch Competition",
              "Tech Talk Series with Industry Leaders",
              "App Development Workshop",
              "Emerging Technologies Showcase",
            ],
          },
          business: {
            professionals: [
              "Executive Leadership Summit",
              "Strategic Planning Retreat",
              "Networking Gala with Industry Leaders",
              "Business Model Innovation Workshop",
              "Corporate Social Responsibility Symposium",
              "Market Expansion Strategy Session",
              "Financial Planning Masterclass",
            ],
            students: [
              "Entrepreneurship Boot Camp",
              "Case Competition",
              "Business Plan Workshop",
              "Mock Investment Pitch Event",
              "Industry Mentorship Program Launch",
              "Professional Development Series",
              "Business Analytics Workshop",
            ],
          },
        }
  
        // Get ideas based on selected options
        const selectedIdeas = ideas[clubType]?.[audience] || [
          "Custom event planning based on your specific requirements",
          "Tailored workshops for your organization",
          "Specialized training programs",
          "Strategic planning sessions",
          "Team building activities",
        ]
  
        // Clear previous ideas
        ideasList.innerHTML = ""
  
        // Create new idea items
        selectedIdeas.forEach((idea) => {
          const item = document.createElement("div")
          item.className = "idea-item"
  
          const icon = document.createElement("div")
          icon.className = "idea-icon"
          icon.innerHTML = '<i class="fas fa-lightbulb"></i>'
  
          const content = document.createElement("div")
          content.className = "idea-content"
  
          const title = document.createElement("h4")
          title.textContent = idea
  
          const description = document.createElement("p")
          description.className = "idea-description"
          description.textContent = `Perfect for ${audience} in the ${clubType} sector with ${budget} budget.`
  
          content.appendChild(title)
          content.appendChild(description)
  
          item.appendChild(icon)
          item.appendChild(content)
  
          ideasList.appendChild(item)
        })
  
        // Show the ideas container
        ideasOutputContainer.classList.remove("hidden")
  
        // Save to localStorage
        const ideasData = {
          clubType,
          audience,
          budget,
          ideas: selectedIdeas,
          createdAt: new Date().toISOString(),
        }
  
        // Get existing ideas or initialize empty array
        const savedIdeas = JSON.parse(localStorage.getItem("clubmate_ideas") || "[]")
        savedIdeas.push(ideasData)
        localStorage.setItem("clubmate_ideas", JSON.stringify(savedIdeas))
  
        showToast(
          "Event Ideas Generated",
          `Generated ${selectedIdeas.length} professional event ideas for your organization.`,
          "success",
        )
      })
    }
  
    // Export ideas (placeholder functionality)
    if (exportIdeasBtn) {
      exportIdeasBtn.addEventListener("click", () => {
        showToast("Export Started", "Your event ideas are being prepared for export.", "success")
  
        // This is a placeholder. In a real application, you would implement
        // actual export functionality, possibly to CSV or PDF
      })
    }
  
    // ===== Helper Functions =====
  
    // Show toast notification
    function showToast(title, message, type = "success") {
      if (!toast || !toastTitle || !toastMessage) {
        console.warn("Toast elements not found in the DOM")
        return
      }
  
      toastTitle.textContent = title
      toastMessage.textContent = message
  
      // Set toast type
      toast.className = "toast"
      toast.classList.add(type)
  
      // Show the toast
      toast.classList.remove("hidden")
  
      // Hide after 5 seconds
      setTimeout(() => {
        toast.classList.add("hidden")
      }, 5000)
    }
  
    // Close mobile menu when window is resized to desktop size
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active")
  
        // Reset menu toggle icon
        if (mobileMenuToggle) {
          const icon = mobileMenuToggle.querySelector("i")
          if (icon) {
            icon.classList.remove("fa-times")
            icon.classList.add("fa-bars")
          }
        }
      }
    })
  })
  