"use client";

import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// Background particles animation using react-tsparticles package
const ParticlesBg = () => {
  // Function to initialize particles engine
  const particlesInit = useCallback(async (engine: any) => {
    // Load the full tsparticles bundle to ensure all features are available
    await loadFull(engine);
  }, []);

  // Function called when particles are loaded (currently empty)
  const particlesLoaded = useCallback(async (container: any) => {
    // You can perform additional actions after particles are loaded, if needed
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 120, // Limit frames per second for smooth animation
        interactivity: {
          events: {
            onClick: {
              enable: false, // Disable click interaction
              mode: "push", // Particle push mode on click
            },
            onHover: {
              enable: true, // Enable hover interaction
              mode: "repulse", // Particle repulse mode on hover
            },
            resize: true, // Resize particles when window size changes
          },
          modes: {
            push: {
              quantity: 4, // Number of particles pushed on click
            },
            repulse: {
              distance: 200, // Distance of particle repulsion on hover
              duration: 0.4, // Duration of repulsion animation
            },
          },
        },
        particles: {
          color: {
            value: "#8A865D", // Particle color
          },
          links: {
            color: "#8A865D", // Link color
            distance: 150, // Maximum distance for links
            enable: true, // Enable particle links
            opacity: 0.5, // Link opacity
            width: 1, // Link width
          },
          collisions: {
            enable: true, // Enable particle collisions
          },
          move: {
            enable: true, // Enable particle movement
            outModes: {
              default: "bounce", // Particle out mode (bounce back)
            },
            random: false, // Disable random movement
            speed: 4, // Particle movement speed
            straight: false, // Allow curved particle movement
          },
          number: {
            density: {
              enable: true, // Enable particle density
              area: 800, // Area of particle density
            },
            value: 30, // Number of particles
          },
          opacity: {
            value: 0.5, // Particle opacity
          },
          shape: {
            type: "circle", // Particle shape (circle)
          },
          size: {
            value: { min: 1, max: 3 }, // Particle size range
          },
        },
        detectRetina: true, // Detect retina displays for higher resolution
      }}
    />
  );
};

export default ParticlesBg;
