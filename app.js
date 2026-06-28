// AI Space Odyssey - Interactive Mechanics

document.addEventListener('DOMContentLoaded', () => {
    // 1. Audio System Elements
    const clickSound = document.getElementById('audio-click');
    const successSound = document.getElementById('audio-success');

    const playClick = () => {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(err => console.log('Audio playback delayed until user interaction.'));
        }
    };

    const playSuccess = () => {
        if (successSound) {
            successSound.currentTime = 0;
            successSound.play().catch(err => console.log('Audio playback delayed.'));
        }
    };

    // 2. Smooth Scroll Launch
    const startJourneyBtn = document.getElementById('btn-start-journey');
    const cataclysmSection = document.getElementById('chapter-cataclysm');

    if (startJourneyBtn && cataclysmSection) {
        startJourneyBtn.addEventListener('click', () => {
            playClick();
            cataclysmSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 3. Scrolling Rocket Tracker along Timeline
    const orbitalTracker = document.getElementById('orbital-tracker');
    const scrollingRocket = document.getElementById('scrolling-rocket');
    const storyboardContainer = document.querySelector('.storyboard-container');

    window.addEventListener('scroll', () => {
        if (!orbitalTracker || !scrollingRocket || !storyboardContainer) return;

        const containerRect = storyboardContainer.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const containerHeight = containerRect.height;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        let relativeProgress = (scrollPosition - containerTop) / containerHeight;
        
        // Clamp between 0% and 100%
        relativeProgress = Math.max(0, Math.min(1, relativeProgress));

        // Update rocket position along the line (leaving margins at top/bottom)
        const travelHeightPercent = relativeProgress * 100;
        scrollingRocket.style.top = `${travelHeightPercent}%`;

        // Add a slight wobble/rotation as it travels down
        const wobble = Math.sin(window.scrollY / 100) * 15;
        scrollingRocket.style.transform = `translate(-50%, -50%) rotate(${45 + wobble}deg)`;
    });

    // 4. Interactive Celestial Map (Telemetry Logging)
    const hotspots = document.querySelectorAll('.planet-hotspot');
    const detailsPanel = document.getElementById('planet-details-panel');
    const detailsTitle = document.getElementById('details-title');
    const detailsText = document.getElementById('details-text');
    const detailsStatsContainer = document.getElementById('details-stats-container');
    const securityBadge = document.getElementById('security-badge');

    // Telemetry databases
    const planetTelemetry = {
        'planet-llm': {
            title: 'LLM Foundations Node',
            text: 'Mastering the core principles of Language Models. Mapping neural architectures, understanding tokenizer boundaries, self-attention parameters, and training loss dynamics that drive neural engine intelligence.',
            status: 'Telemetry Status: Calibrated',
            security: false
        },
        'planet-models': {
            title: '2026 Model Landscapes',
            text: 'Navigating deep-reasoning frontiers. Charting multimodal sensory layers, context-window expansions up to millions of tokens, and analyzing cost-to-performance charts across frontier systems.',
            status: 'Active Frontiers: Synced',
            security: false
        },
        'planet-prompting': {
            title: 'Prompt Engineering Coordinates',
            text: 'Structuring complex instruction payloads. Mastering system prompt isolation, few-shot demonstration anchors, structured JSON output design, and leveraging strict XML tagging for robust parsing safety.',
            status: 'Instructions: Calibrated',
            security: false
        },
        'planet-agentic-trans': {
            title: 'Transition to Agentic AI',
            text: 'Steering the ship beyond simple prompt-response paths. Constructing autonomous reasoning loops (ReAct), multi-turn planning pathways, short/long-term memory banks, and autonomous error recovery.',
            status: 'Agentic Loop: Stabilized (98%)',
            security: false
        },
        'planet-frameworks': {
            title: 'Agentic Application Frameworks',
            text: 'Interfacing task orchestration scaffolding. Building workflows using modern agent layers, stitching together multi-agent crews, orchestrating complex task delegation, and managing state across sessions.',
            status: 'Frameworks: Linked',
            security: false
        },
        'planet-vibe': {
            title: 'Coding with AI (Vibe Coding)',
            text: 'Achieving flow-state code generation. Partnering with AI coding assistants to co-create code in real time using conversational triggers, elevating developers from builders to orchestrators.',
            status: 'Vibe Velocity: 10x Boosted',
            security: false
        },
        'planet-prod': {
            title: 'Production Readiness & Security',
            text: 'Deploying orbital shields. Fortifying system queries against adversarial prompt injection, auditing API latency, setting up rate limit buffers, and organizing automated evaluation rigs.',
            status: 'Security Grid: Locked',
            security: true
        }
    };

    hotspots.forEach(hotspot => {
        // Handle Hover & Click interactions
        const triggerTelemetry = () => {
            // Remove active status from all hotspots
            hotspots.forEach(h => h.classList.remove('active'));
            
            // Add active status to selected hotspot
            hotspot.classList.add('active');

            const planetId = hotspot.id;
            const data = planetTelemetry[planetId];

            if (data && detailsPanel) {
                detailsPanel.classList.add('active-state');
                detailsTitle.textContent = data.title;
                detailsText.textContent = data.text;
                detailsStatsContainer.style.display = 'flex';
                
                // Set first badge text
                const statusBadge = detailsStatsContainer.firstElementChild;
                statusBadge.textContent = data.status;

                // Handle security alert badge
                if (data.security && securityBadge) {
                    securityBadge.style.display = 'inline-block';
                } else if (securityBadge) {
                    securityBadge.style.display = 'none';
                }
            }
        };

        hotspot.addEventListener('click', () => {
            playClick();
            triggerTelemetry();
        });

        hotspot.addEventListener('mouseenter', () => {
            triggerTelemetry();
        });
    });

    // 5. Interactive Hands-on Terminal Launch Simulator
    const btnDeploy = document.getElementById('btn-deploy-project');
    const terminalScreen = document.getElementById('terminal-screen');
    const deployStatusLine = document.getElementById('deploy-status-line');

    if (btnDeploy && terminalScreen) {
        btnDeploy.addEventListener('click', () => {
            playClick();
            // Disable button during deployment
            btnDeploy.disabled = true;
            btnDeploy.textContent = 'PARSING MANIFEST...';
            btnDeploy.style.background = '#1b1540';
            btnDeploy.style.cursor = 'not-allowed';

            // Clear terminal lines except first one
            terminalScreen.innerHTML = `
                <div class="terminal-line"><span class="prompt">$</span> streamlit run app.py --data=train_consist.txt</div>
                <div class="terminal-line comment"># Initializing manifest parser engine...</div>
            `;

            const deploymentSteps = [
                { text: '> Loading train consist database... [150 cars loaded]', class: '' },
                { text: '> Scanning text manifests for Hazmat classes...', class: '' },
                { text: '> WARNING: Class 3 (Flammable Liquids) detected at Car 42 & 43!', class: 'success-text' },
                { text: '> WARNING: Class 8 (Corrosive Materials) detected at Car 89!', class: 'success-text' },
                { text: '> Tabulating total train weight... [18,450 TONS]', class: '' },
                { text: '> Generating dashboard layout for conductors & first responders...', class: '' },
                { text: '> Deployed FreightcarchecK successfully to active monitoring orbit!', class: 'success-text' }
            ];

            let stepIndex = 0;

            const executeStep = () => {
                if (stepIndex < deploymentSteps.length) {
                    const step = deploymentSteps[stepIndex];
                    const line = document.createElement('div');
                    line.className = 'terminal-line ' + step.class;
                    line.textContent = step.text;
                    terminalScreen.appendChild(line);
                    terminalScreen.scrollTop = terminalScreen.scrollHeight;
                    stepIndex++;
                    setTimeout(executeStep, 800);
                } else {
                    // Deployment Completed
                    playSuccess();
                    btnDeploy.textContent = 'DASHBOARD ACTIVE';
                    btnDeploy.style.background = 'linear-gradient(135deg, #00ff88 0%, #00aa5d 100%)';
                    btnDeploy.style.color = '#05040f';
                    
                    const successBanner = document.createElement('div');
                    successBanner.className = 'terminal-line success-text';
                    successBanner.style.fontWeight = 'bold';
                    successBanner.style.marginTop = '10px';
                    successBanner.textContent = '=========================================\n[FREIGHTCARCHECK DASHBOARD ONLINE]\n=========================================';
                    terminalScreen.appendChild(successBanner);
                    terminalScreen.scrollTop = terminalScreen.scrollHeight;
                }
            };

            setTimeout(executeStep, 600);
        });
    }

    // 6. Multi-Voyage HUD Tab Switching
    const hudButtons = document.querySelectorAll('.hud-tab-btn');
    const voyageSections = document.querySelectorAll('.voyage-section');
    const missionTitle = document.getElementById('mission-voyage-title');
    const systemStatusValue = document.getElementById('system-status-value');
    const heroBadge = document.getElementById('hero-voyage-badge');

    hudButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            
            const selectedVoyage = btn.getAttribute('data-voyage');
            
            // Toggle active buttons
            hudButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active sections
            voyageSections.forEach(section => {
                if (section.id === `voyage-section-${selectedVoyage}`) {
                    section.style.display = 'block';
                    section.classList.add('active');
                } else {
                    section.style.display = 'none';
                    section.classList.remove('active');
                }
            });
            
            // Update HUD Header and Hero Information
            if (missionTitle) missionTitle.textContent = `VOYAGER-${selectedVoyage}`;
            
            if (selectedVoyage === '1' || selectedVoyage === '2' || selectedVoyage === '3' || selectedVoyage === '4') {
                if (systemStatusValue) {
                    systemStatusValue.textContent = `WEEK ${selectedVoyage} ACTIVE`;
                    systemStatusValue.style.color = 'var(--neon-green)';
                }
                if (heroBadge) heroBadge.textContent = `MISSION SUMMARY: WEEK ${selectedVoyage}`;
                if (orbitalTracker) orbitalTracker.style.display = 'block';
            } else {
                if (systemStatusValue) {
                    systemStatusValue.textContent = `WEEK ${selectedVoyage} STANDBY`;
                    systemStatusValue.style.color = 'var(--neon-pink)';
                }
                if (heroBadge) heroBadge.textContent = `MISSION SUMMARY: WEEK ${selectedVoyage}`;
                if (orbitalTracker) orbitalTracker.style.display = 'none';
            }
            
            // Scroll smoothly to start of content
            const scrollAnchor = document.querySelector('.voyage-hud-container');
            if (scrollAnchor) {
                scrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================================================
    // 7. COHORT KNOWLEDGE ARCHIVE (WEEK 1 GLOSSARY VAULT) DATA & LOGIC
    // ==========================================================================

    const glossaryData = {
        llm: {
            title: 'LLM Foundations',
            subcategories: {
                'llm-foundations': {
                    label: 'LLM Foundations',
                    terms: [
                        { name: 'Artificial Intelligence (AI)', definition: 'Software systems that perform tasks associated with human intelligence — reasoning, language understanding, perception, planning, or decision-making. In this course, AI refers to modern model-based systems rather than hand-coded rules.' },
                        { name: 'Generative AI', definition: 'AI that creates new content such as text, code, images, audio, or structured data. LLMs are the text-and-code-centered branch of generative AI.' },
                        { name: 'Large Language Model (LLM)', definition: 'A neural network trained on large amounts of text and code to predict and generate tokens. LLMs can answer questions, write code, summarize documents, reason through tasks, and call tools when connected to an agent harness.' },
                        { name: 'Foundation Model', definition: 'A large pretrained model that can be adapted or prompted for many tasks. LLMs, vision-language models, and multimodal models are all examples of foundation models.' },
                        { name: 'Neural Network', definition: 'A machine learning model made of layers of mathematical units that learn patterns from data. Modern LLMs are very large neural networks trained with massive compute.' },
                        { name: 'Parameters', definition: 'The learned numerical weights inside a model. More parameters can increase capacity, but size alone does not guarantee better answers, lower cost, or better latency.' },
                        { name: 'Pretraining', definition: 'The broad training phase where a model learns general patterns from large datasets. For LLMs, this usually means learning to predict text across internet-scale corpora.' },
                        { name: 'Fine-Tuning', definition: 'Additional training that adapts a pretrained model to a narrower task, style, domain, or behavior. Fine-tuning changes the model weights, unlike prompting, which only changes the input.' },
                        { name: 'Instruction Tuning', definition: 'Training a model to follow human-style instructions rather than merely continue text. It helps turn raw completion models into useful assistants.' },
                        { name: 'RLHF', definition: 'Reinforcement Learning from Human Feedback — a training method that uses human preference data to shape model behavior. It helped make chat models more helpful, polite, and instruction-following.' },
                        { name: 'Chat Model', definition: 'An LLM packaged to handle role-based conversations such as system, user, and assistant messages. Chat models are usually optimized to answer instructions rather than simply complete a passage.' },
                        { name: 'Completion Model', definition: 'A model interface that continues a text prompt. Modern builders usually use chat or responses-style APIs instead, but completion behavior still explains how token generation works.' },
                        { name: 'Non-Determinism', definition: 'The property that a model may produce different valid outputs for the same prompt. This is useful for creativity, but production systems must manage it with parameters, tests, retries, and evaluation.' },
                        { name: 'Hallucination', definition: 'A confident but incorrect or unsupported model output. Good context, retrieval, constraints, verification, and observability reduce hallucinations but do not eliminate them.' },
                        { name: 'Reasoning Model', definition: 'A model optimized to spend more computation on planning, problem solving, or multi-step reasoning before answering. These models can be useful for harder tasks but may cost more and respond slower.' },
                        { name: 'Extended Thinking', definition: 'A product or model behavior where the model internally plans before giving a final answer. It is especially relevant for agentic workflows that require multi-step decisions.' }
                    ]
                },
                'transformer': {
                    label: 'Transformer Architecture',
                    terms: [
                        { name: 'Transformer', definition: 'The neural network architecture behind most modern LLMs. It replaced recurrence with attention, making large-scale parallel training practical.' },
                        { name: 'Attention', definition: 'The mechanism that lets each token weigh which other tokens in the context are relevant. Attention is the core reason transformers can use surrounding context effectively.' },
                        { name: 'Self-Attention', definition: 'Attention applied among tokens in the same input sequence. Each token can compare itself to other tokens and pull in relevant information.' },
                        { name: 'Attention Head', definition: 'One parallel attention pathway inside a transformer layer. Multiple heads allow the model to track different kinds of relationships at the same time.' },
                        { name: 'Layer', definition: 'A repeated processing block in a neural network. In transformers, layers usually combine attention, feed-forward computation, normalization, and residual connections.' },
                        { name: 'Embedding', definition: 'A vector representation of meaning. Text, images, audio, or other data can be embedded so similar items land near each other in vector space.' },
                        { name: 'Embedding Model', definition: 'A model specialized for converting content into vectors. Builders use embedding models for semantic search, retrieval, clustering, recommendation, and RAG.' },
                        { name: 'Vector', definition: 'A list of numbers representing an item in mathematical space. In AI applications, vectors make it possible to compare meaning using distance or similarity.' },
                        { name: 'Vector Space', definition: 'The high-dimensional space where embeddings live. Items with related meaning tend to be closer together in this space.' },
                        { name: 'Semantic Similarity', definition: 'A measure of how close two pieces of content are in meaning, not just exact wording. It is central to embeddings, search, and retrieval systems.' }
                    ]
                },
                'tokenization': {
                    label: 'Tokenization & Context',
                    terms: [
                        { name: 'Token', definition: 'The unit of text that an LLM reads and writes. Tokens may be words, parts of words, punctuation, or spaces. Both cost and context limits are measured in tokens.' },
                        { name: 'Tokenizer', definition: 'The component that splits text into tokens for a specific model. Different model families can tokenize the same sentence differently.' },
                        { name: 'BPE', definition: 'Byte Pair Encoding — a common tokenization algorithm used by GPT, Llama, Mistral, and many other models. It repeatedly merges frequent character or byte pairs into reusable token pieces.' },
                        { name: 'Vocabulary', definition: 'The set of tokens a model tokenizer knows. Each model family learns or defines its own vocabulary, which affects token counts and costs.' },
                        { name: 'Input Tokens', definition: 'Tokens sent to the model, including user messages, system prompts, retrieved context, tool results, and conversation history. Input tokens are usually cheaper and can be processed in parallel.' },
                        { name: 'Output Tokens', definition: 'Tokens generated by the model. Output tokens are often more expensive because they are produced one at a time.' },
                        { name: 'Context Window', definition: 'The maximum amount of input plus output the model can handle in one call. Anything outside the context window is invisible to the model unless reintroduced.' },
                        { name: 'Working Memory', definition: 'A practical way to think about the context window. The model does not remember past calls unless the application sends relevant history or stored memory back in.' },
                        { name: 'Context Length', definition: 'The token capacity of a model\'s context window. Longer context helps with large documents, but quality still depends on relevance, sufficiency, and structure.' },
                        { name: 'Lost in the Middle', definition: 'A failure pattern where models retrieve information better from the beginning or end of a long context than from the middle. Long prompts need careful structure, not just more tokens.' },
                        { name: 'Context Rot', definition: 'The degradation that happens when long context includes too much stale, irrelevant, duplicated, or poorly structured information. Better data plumbing often helps more than simply switching to a bigger model.' },
                        { name: 'Context Pollution', definition: 'Accumulated irrelevant history, old errors, abandoned approaches, or stale decisions inside a conversation. For coding and agent work, starting a fresh task context can improve quality.' }
                    ]
                },
                'prompting': {
                    label: 'Prompt & Message Design',
                    terms: [
                        { name: 'Prompt', definition: 'The input instructions and context sent to a model. A good prompt states the goal, constraints, required format, examples, and edge cases when needed.' },
                        { name: 'System Prompt', definition: 'The high-priority instruction layer that defines the model\'s role, rules, tone, and boundaries. It is billed on every call, so long system prompts affect both cost and latency.' },
                        { name: 'User Prompt', definition: 'The instruction or request from the end user. It usually has lower priority than the system prompt but drives the task the model should complete.' },
                        { name: 'Prompt Anatomy', definition: 'The structure of a useful prompt, often including role, task, context, constraints, examples, output format, and acceptance criteria. Clear anatomy reduces ambiguity.' },
                        { name: 'Few-Shot Prompting', definition: 'Providing examples in the prompt so the model can infer the desired pattern. Useful for formatting, tone, classification, extraction, and domain-specific behavior.' },
                        { name: 'Zero-Shot Prompting', definition: 'Asking the model to perform a task without examples. Works best for simple or common tasks that the model already understands well.' },
                        { name: 'Chain-of-Thought', definition: 'A prompting or model behavior where reasoning steps are generated before an answer. In production, builders often prefer concise rationales or hidden reasoning-style models.' },
                        { name: 'Output Format', definition: 'The structure the model must return — prose, JSON, Markdown, a table, or a list. Specifying the output format is essential for automation and downstream parsing.' },
                        { name: 'Structured Output', definition: 'A controlled model response that conforms to a fixed schema, often JSON. Used when the response must feed another system instead of just being read by a human.' },
                        { name: 'Schema', definition: 'A formal description of fields, types, and constraints for structured data. In LLM apps, schemas make outputs easier to validate and use safely.' },
                        { name: 'JSON', definition: 'A lightweight data format made of objects, arrays, strings, numbers, booleans, and null. Function definitions, structured outputs, and many API requests use JSON.' },
                        { name: 'Prompt Anti-Pattern', definition: 'A prompting habit that makes output worse — vague asks, conflicting instructions, missing constraints, or asking for too many unrelated tasks at once. Many model failures begin as instruction failures.' },
                        { name: 'Prompt Engineering', definition: 'The practice of designing prompts so models produce more useful and reliable outputs. It is less about magic phrases and more about precise specs, context, and evaluation.' }
                    ]
                },
                'apis': {
                    label: 'Model APIs & Parameters',
                    terms: [
                        { name: 'API', definition: 'An application programming interface that lets software call another service. LLM APIs let your code send prompts, receive responses, stream tokens, and use tools.' },
                        { name: 'API Request', definition: 'The payload your application sends to a model provider. It usually includes the model name, messages, parameters, tools, and output constraints.' },
                        { name: 'API Response', definition: 'The provider\'s returned result, including generated content, tool calls, usage metadata, and sometimes safety or finish information. Production systems should inspect more than just the text.' },
                        { name: 'API Key', definition: 'A secret credential used to authenticate with a model provider. Treat it like an open credit card: never commit it to GitHub, expose it in client code, or share it casually.' },
                        { name: 'Environment Variable', definition: 'A secure way to pass configuration such as API keys into an application at runtime. It keeps secrets out of source code and makes deployments easier to manage.' },
                        { name: 'Streaming', definition: 'Returning generated tokens incrementally as they are produced. Streaming improves perceived speed for chat interfaces because users see the first tokens sooner.' },
                        { name: 'Non-Streaming', definition: 'Waiting for the full model response before returning anything. It is simpler for batch jobs, structured outputs, and workflows where partial text is not useful.' },
                        { name: 'Temperature', definition: 'A parameter that controls randomness in generation. Lower temperature is more consistent; higher temperature is more varied and creative.' },
                        { name: 'Top-p', definition: 'A sampling parameter that limits token choices to a probability mass cutoff. It is another way to tune randomness and diversity.' },
                        { name: 'Max Tokens', definition: 'The maximum number of output tokens the model may generate. Setting it too low can cut off answers, while setting it too high can waste money or slow responses.' },
                        { name: 'Stop Sequence', definition: 'A string or token pattern that tells generation to stop. Stop sequences are useful for templates, parsers, and preventing unwanted continuation.' },
                        { name: 'Rate Limit', definition: 'A provider-imposed limit on how many requests or tokens you can use in a time window. Production apps need retries, backoff, fallbacks, or queueing to handle rate limits.' }
                    ]
                },
                'selection': {
                    label: 'Model Selection & Landscape',
                    terms: [
                        { name: 'Inference Provider', definition: 'A company or platform that hosts models and exposes them through APIs. Examples include Together AI, Fireworks AI, Nebius, and Groq.' },
                        { name: 'Model Hub', definition: 'A marketplace or repository where models are listed, documented, and shared. Hugging Face is the best-known model hub for open and open-weight models.' },
                        { name: 'Hugging Face', definition: 'A platform for models, datasets, demos, and AI tooling. Builders use it to discover models, compare licenses, access datasets, and try demos in Spaces.' },
                        { name: 'Hugging Face Spaces', definition: 'Hosted demo apps for models and AI projects. They are useful for trying behavior before setting up infrastructure.' },
                        { name: 'Hugging Face Inference Providers', definition: 'A marketplace-style route for calling models hosted by different providers from the Hugging Face interface. Useful for testing and comparing options quickly.' },
                        { name: 'Hugging Face Inference Endpoints', definition: 'Dedicated model-serving infrastructure managed through Hugging Face. Use these when you need more control, scale, or production isolation.' },
                        { name: 'LM Arena', definition: 'A live leaderboard based on blind A/B user preference voting. Useful for real-world preference signals but can be biased toward confident or verbose answers.' },
                        { name: 'Elo Score', definition: 'A ranking system originally used in chess and now used by some model leaderboards. In LM Arena, models gain or lose rating based on which response users prefer.' },
                        { name: 'Static Benchmark', definition: 'A fixed evaluation dataset such as MMLU or HumanEval. Static benchmarks are useful but can become stale, overfit, or misaligned with your exact use case.' },
                        { name: 'OpenRouter', definition: 'A unified API gateway for accessing many model providers through one interface. It helps with model swapping, price comparison, routing, and fallbacks.' },
                        { name: 'Model Routing', definition: 'Sending different tasks to different models based on cost, latency, capability, or reliability. Simple tasks can use cheaper models while hard tasks use frontier models.' },
                        { name: 'Automatic Fallback', definition: 'Switching to another model or provider when the primary path fails, times out, or hits a rate limit. It improves reliability but requires careful quality controls.' },
                        { name: 'Frontier Model', definition: 'A model near the current leading edge of capability. Frontier models are often more expensive but useful for complex reasoning, coding, and agentic work.' }
                    ]
                },
                'tradeoffs': {
                    label: 'Model Trade-Offs',
                    terms: [
                        { name: 'Capability', definition: 'How well a model performs on the task you care about. Capability should be judged by your use case, not by a generic overall leaderboard alone.' },
                        { name: 'Cost', definition: 'The money spent on input tokens, output tokens, hosting, storage, and infrastructure. Cost control requires prompt discipline, caching, routing, batching, and model choice.' },
                        { name: 'Latency', definition: 'The time it takes for a model system to respond. Users feel latency strongly in chat, while agents and batch workflows may care more about total completion time.' },
                        { name: 'Privacy', definition: 'The degree to which data is protected from exposure, logging, training use, or cross-tenant access. Privacy requirements often shape model provider, hosting, and architecture choices.' },
                        { name: 'Data Residency', definition: 'The rule or requirement that data stay in a specific region or jurisdiction. It matters for regulated industries, enterprise buyers, and sovereign hosting.' },
                        { name: 'Vendor Lock-In', definition: 'Dependency on a specific provider\'s API, models, tooling, or pricing. Abstractions, routing layers, and portable schemas can reduce lock-in, but not remove it entirely.' }
                    ]
                },
                'latency': {
                    label: 'Latency & Performance',
                    terms: [
                        { name: 'TTFT (Time to First Token)', definition: 'How long it takes before the user sees the first streamed token. Strongly affects perceived responsiveness in chat interfaces.' },
                        { name: 'TPS (Tokens Per Second)', definition: 'The speed at which output tokens stream after generation begins. Higher TPS feels smoother, especially for long answers.' },
                        { name: 'E2E (End-to-End Latency)', definition: 'Total time from request start to final result. Matters most for agents, workflows, and batch tasks where the user waits for completion.' },
                        { name: 'Throughput', definition: 'How much work a system can process over time — requests per minute or tokens per second across many users. It matters for scaling beyond demos.' },
                        { name: 'Batching', definition: 'Combining multiple requests or operations to improve throughput or reduce overhead. Batching can lower cost but may increase individual request latency.' },
                        { name: 'Caching', definition: 'Reusing previous results or provider-side prompt prefixes instead of recomputing everything. Caching can reduce cost and latency when repeated context or queries are common.' }
                    ]
                },
                'reliability': {
                    label: 'Reliability & Observability',
                    terms: [
                        { name: 'Reliability', definition: 'The ability of an application to work correctly despite provider outages, rate limits, bad outputs, and unexpected inputs. LLM reliability requires application design, not just a better model.' },
                        { name: 'Retry', definition: 'Re-running a failed request or step. Retries should use limits, backoff, and failure classification so the system does not loop forever.' },
                        { name: 'Backoff', definition: 'Waiting longer between retries after failures. Backoff prevents your app from making an outage or rate-limit problem worse.' },
                        { name: 'Timeout', definition: 'A maximum wait time for an operation. Timeouts prevent an agent or app from hanging indefinitely when a model, tool, or API is slow.' },
                        { name: 'Circuit Breaker', definition: 'A reliability pattern that temporarily stops calling a failing service. It protects the rest of the app and can trigger fallbacks.' },
                        { name: 'Observability', definition: 'The ability to inspect what your LLM app is doing through logs, traces, metrics, and evaluations. It is essential because bad answers often look superficially fine.' },
                        { name: 'Logging', definition: 'Recording requests, responses, tool calls, errors, and metadata for debugging. Logs should avoid leaking secrets or sensitive user data.' },
                        { name: 'Tracing', definition: 'Capturing the sequence of steps in an agent or workflow. Traces help debug which prompt, model call, tool call, or decision caused a failure.' },
                        { name: 'Metric', definition: 'A measured signal such as cost per request, latency, success rate, tool error rate, or user satisfaction. Metrics turn vague model quality into something you can monitor.' },
                        { name: 'Evaluation', definition: 'A systematic way to test whether a model or app performs well. Evaluations can be automated, human-reviewed, benchmark-based, or task-specific.' }
                    ]
                }
            }
        },
        agentic: {
            title: 'Agentic AI',
            subcategories: {
                'agentic-foundations': {
                    label: 'Agentic AI Foundations',
                    terms: [
                        { name: 'AI Agent', definition: 'An AI system that can pursue a goal over multiple steps, often by planning, using tools, observing results, and adjusting. The model is the brain, but the harness controls the work.' },
                        { name: 'Agentic Workflow', definition: 'A workflow where an LLM participates in planning or decision-making instead of only producing a one-shot response. It usually includes loops, tool calls, state, and verification.' },
                        { name: 'Planning', definition: 'Breaking a goal into steps before or during execution. Planning helps agents handle multi-step tasks but must be checked against reality after each action.' },
                        { name: 'Tool Use', definition: 'Letting a model request external actions such as search, code execution, file reads, database queries, or API calls. Tool use connects language reasoning to the outside world.' },
                        { name: 'Tool Call', definition: 'A structured request from the model to run a specific function or tool with arguments. The app or harness executes the tool and returns the result to the model.' },
                        { name: 'Function Calling', definition: 'A model capability where the LLM outputs structured arguments for predefined functions. It lets LLMs trigger actions without pretending to execute them directly.' },
                        { name: 'Function Definition', definition: 'The JSON-like description of a tool name, purpose, and arguments. Clear definitions help the model call the right function with valid inputs.' },
                        { name: 'Agent Harness', definition: 'The surrounding software that gives the model context, tools, permissions, memory, budgets, and verification. It mediates every action so the model is not operating uncontrolled.' },
                        { name: 'Guardrails', definition: 'Constraints that limit unsafe, expensive, incorrect, or unauthorized behavior. Guardrails can include schema validation, access control, human review, budget caps, and policy checks.' },
                        { name: 'Permissions', definition: 'Rules defining what an agent is allowed to access or change. Especially important for tools that read private data, spend money, send messages, or modify files.' },
                        { name: 'Human in the Loop', definition: 'A workflow where a human approves, reviews, or guides important agent actions. Useful for high-risk steps such as sending emails, deleting data, or deploying code.' },
                        { name: 'Step Limit', definition: 'A maximum number of actions an agent may take. Step limits prevent runaway loops and control cost.' },
                        { name: 'Budget Cap', definition: 'A spending or token limit for an agent run. Budget caps keep experimentation and automation from becoming unexpectedly expensive.' },
                        { name: 'Verification', definition: 'Checking that the requested work actually happened, not just that the model claimed it happened. For coding, this may mean tests; for documents, readback; for tools, inspecting returned state.' },
                        { name: 'Error Recovery', definition: 'Detecting and correcting failures such as tool errors, invalid arguments, bad plans, loops, or missing context. Strong agents recover deliberately instead of retrying blindly.' },
                        { name: 'Memory', definition: 'Stored information used across turns or sessions. Since models are stateless by default, memory must be implemented by the application through history, databases, files, or retrieval.' },
                        { name: 'State', definition: 'The current working information an app or agent tracks — user goal, partial results, tool outputs, and decisions. Good state management prevents agents from losing the plot.' },
                        { name: 'Subagent', definition: 'A specialized agent used by a main agent for a narrower task. Subagents can help parallelize work or separate responsibilities, but they add coordination complexity.' },
                        { name: 'Skill', definition: 'A reusable instruction or workflow package that teaches an agent how to handle a class of tasks. Skills make behavior more consistent than re-explaining the process each time.' },
                        { name: 'Plugin', definition: 'A packaged extension that gives an agent or app additional tools, integrations, or workflows. Plugins often connect the model to external systems.' }
                    ]
                },
                'frameworks': {
                    label: 'Frameworks & Automation',
                    terms: [
                        { name: 'Agentic Framework', definition: 'A software framework for building agents, tool calls, workflows, memory, and orchestration. Frameworks provide structure so builders do not rebuild the harness from scratch.' },
                        { name: 'LangChain', definition: 'A popular framework for building LLM applications with chains, prompts, tools, retrievers, agents, and integrations. Useful for prototyping and connecting many LLM app components.' },
                        { name: 'LangChain Core Primitives', definition: 'The basic abstractions LangChain uses — prompts, models, output parsers, retrievers, tools, and runnables. Knowing these helps you read LangChain examples without getting lost.' },
                        { name: 'n8n', definition: 'A workflow automation tool that connects apps, triggers, data transformations, and APIs. In agentic systems, it can orchestrate steps around an LLM or expose tools to an AI workflow.' },
                        { name: 'Chain', definition: 'A sequence of model calls, transformations, or tool steps. Chains are useful when the workflow is mostly predictable.' },
                        { name: 'Runnable', definition: 'A LangChain abstraction for something that can be invoked, composed, streamed, or batched. It helps standardize how components plug together.' },
                        { name: 'Output Parser', definition: 'A component that converts model text into a desired format. Parsers are often paired with structured output, schemas, or validation.' },
                        { name: 'Retriever', definition: 'A component that finds relevant external information for a query. Retrievers are central to RAG and document-aware applications.' },
                        { name: 'Trigger', definition: 'An event that starts an automation — a form submission, schedule, webhook, file upload, or new database row. Triggers define when work begins.' },
                        { name: 'Workflow', definition: 'A connected set of steps that move data or decisions from start to finish. Agentic workflows combine deterministic steps with LLM reasoning or generation.' },
                        { name: 'Orchestration', definition: 'Coordinating multiple steps, tools, models, and services to complete a task. Good orchestration handles order, retries, state, and error recovery.' },
                        { name: 'Automation', definition: 'Using software to execute repeated tasks with minimal human effort. Agentic automation adds model-driven decisions to workflows that were previously rule-based.' },
                        { name: 'Application Mental Map', definition: 'A high-level view of how an LLM app is assembled: inputs, model calls, prompts, tools, memory, data sources, outputs, evaluation, and deployment. It helps builders reason about the whole system.' },
                        { name: 'LLM Application Building Block', definition: 'A reusable component of an AI app — a prompt, model, retriever, tool, parser, database, queue, or evaluator. Most real apps are combinations of these blocks.' }
                    ]
                },
                'retrieval': {
                    label: 'Retrieval & Data Plumbing',
                    terms: [
                        { name: 'RAG', definition: 'Retrieval-Augmented Generation — a pattern where the app retrieves relevant external content and gives it to the model before answering. It helps models answer from private or current data without retraining.' },
                        { name: 'Knowledge Base', definition: 'A curated set of documents, records, or facts that an application can retrieve from. Quality depends on good ingestion, chunking, metadata, and updates.' },
                        { name: 'Chunking', definition: 'Splitting documents into smaller pieces for embedding and retrieval. Chunk size and boundaries affect whether the right context is found.' },
                        { name: 'Vector Database', definition: 'A database optimized for storing and searching embeddings. It supports semantic search across large sets of documents or records.' },
                        { name: 'Semantic Search', definition: 'Search based on meaning rather than exact keywords. It uses embeddings to find relevant content even when wording differs.' },
                        { name: 'Relevance', definition: 'How closely retrieved context matches the user\'s question or task. Irrelevant context wastes tokens and can make answers worse.' },
                        { name: 'Sufficiency', definition: 'Whether the provided context contains enough information to answer correctly. A small but complete context is often better than a huge incomplete one.' },
                        { name: 'Structure', definition: 'How clearly context is organized for the model. Headings, ordering, deduplication, and source labels can improve model performance.' },
                        { name: 'Data Plumbing', definition: 'The ingestion, cleaning, storage, retrieval, routing, and formatting of data around the model. Many LLM app wins come from better plumbing rather than changing models.' }
                    ]
                },
                'multimodal': {
                    label: 'Multimodal AI',
                    terms: [
                        { name: 'Vision Model', definition: 'A model that understands images or visual inputs. It can classify images, read screenshots, extract information, describe scenes, or support visual QA.' },
                        { name: 'Vision-Language Model', definition: 'A model that combines image understanding with text reasoning. Useful for asking questions about screenshots, diagrams, forms, and UI states.' },
                        { name: 'Audio AI', definition: 'AI systems that process or generate speech and sound. Common use cases include transcription, voice agents, translation, summarization, and real-time speech interaction.' },
                        { name: 'Image Generation', definition: 'Creating images from text or image prompts. Builders choose models based on style control, realism, prompt following, speed, cost, and licensing.' },
                        { name: 'Multimodal Model', definition: 'A model that can work across more than one data type — text, images, audio, video, or files. Multimodal agents can inspect richer environments than text-only agents.' },
                        { name: 'Transcription', definition: 'Converting spoken audio into text. It is often the first step in meeting summaries, call analytics, and voice interfaces.' },
                        { name: 'Text-to-Speech', definition: 'Generating spoken audio from text. It is used for voice assistants, accessibility, narration, and real-time conversational agents.' }
                    ]
                }
            }
        },
        prod: {
            title: 'Production & Security',
            subcategories: {
                'coding': {
                    label: 'Coding with AI',
                    terms: [
                        { name: 'AI Coding Harness', definition: 'A product or system that connects an AI model to a codebase, editor, shell, tests, browser, and file system. It turns a model from a code suggester into a coding assistant or agent.' },
                        { name: 'OpenAI Codex', definition: 'OpenAI\'s cloud-based software engineering agent that can read code, edit files, run commands, verify work, and open pull requests. Built on top of reasoning models, not simply an API model.' },
                        { name: 'Cursor', definition: 'An AI-native code editor focused on code generation, chat, and codebase-aware assistance. Strongest when the developer stays actively involved in the editing loop.' },
                        { name: 'Claude Code', definition: 'Anthropic\'s coding agent interface for working with local codebases from the terminal. Part of the broader category of AI coding harnesses.' },
                        { name: 'Windsurf', definition: 'An AI coding environment designed around codebase context and assisted development. Like other harnesses, its value depends on review, tests, and clear task specs.' },
                        { name: 'Vibe Coding', definition: 'A casual term for building software by steering AI-generated code through natural language. It can move fast, but the human still needs to review architecture, correctness, security, and maintainability.' },
                        { name: 'Code Review', definition: 'Reading generated or human-written code to find bugs, bad abstractions, security issues, and maintainability problems. AI makes review more important, not less.' },
                        { name: 'Test', definition: 'A repeatable check that code behaves as expected. Tests are one of the best verification tools for AI-assisted coding.' },
                        { name: 'Sandbox', definition: 'An isolated environment where code can run with limited access. Sandboxes reduce risk when agents execute commands or modify files.' },
                        { name: 'Pull Request', definition: 'A proposed code change submitted for review before merging. Coding agents may open pull requests after completing and verifying a task.' },
                        { name: 'System Design', definition: 'The practice of choosing architecture, components, data flow, and trade-offs for a software system. AI can suggest implementations, but engineers must judge whether the design is appropriate.' },
                        { name: 'Technical Debt', definition: 'Future cost created by rushed, brittle, duplicated, or poorly understood code. AI-generated code can create debt quickly if no one reviews or refactors it.' }
                    ]
                },
                'security': {
                    label: 'Security & Governance',
                    terms: [
                        { name: 'Secret', definition: 'Sensitive information such as API keys, tokens, passwords, or private credentials. Secrets should be stored securely and never placed in prompts, logs, screenshots, or public repositories.' },
                        { name: 'Least Privilege', definition: 'Giving a system only the permissions it needs to do its job. Agents should not receive broad access when a narrow tool or scope is enough.' },
                        { name: 'Access Control', definition: 'Rules that decide who or what can read, write, run, or modify resources. Critical when agents interact with private data or production systems.' },
                        { name: 'Audit Trail', definition: 'A record of actions taken by users, agents, tools, or systems. Audit trails help debug incidents and prove what happened.' },
                        { name: 'Compliance', definition: 'Meeting legal, regulatory, contractual, or organizational requirements. Model choice, data storage, logging, and human review may all be shaped by compliance.' },
                        { name: 'PII', definition: 'Personally identifiable information — names, emails, addresses, IDs, or phone numbers. LLM apps should minimize, protect, and carefully log PII.' },
                        { name: 'Redaction', definition: 'Removing or masking sensitive information before sending, storing, or displaying it. Redaction reduces privacy and security risk.' }
                    ]
                },
                'readiness': {
                    label: 'Production Readiness',
                    terms: [
                        { name: 'Prototype', definition: 'An early version built to test feasibility or learning. Prototypes can be messy, but they should not be mistaken for production systems.' },
                        { name: 'MVP', definition: 'Minimum Viable Product — the smallest version that delivers real value and tests the core assumption. For AI apps, the MVP must include enough evaluation to know whether the model output is usable.' },
                        { name: 'Production', definition: 'A deployed system used by real users or business workflows. Production LLM apps need monitoring, fallbacks, cost controls, security, and support paths.' },
                        { name: 'SLA', definition: 'Service Level Agreement — a reliability or performance commitment. If an LLM provider or workflow has an SLA, your app design should account for what happens when it is not met.' },
                        { name: 'Cost Control', definition: 'The set of practices that reduce LLM spend — caching, routing, shorter prompts, batching, cheaper models, and limiting output tokens. Cost control should be designed early, not added after the bill arrives.' },
                        { name: 'Quality Control', definition: 'Processes that ensure outputs meet the required standard. For LLM apps this can include schemas, validators, evaluations, human review, and post-generation checks.' },
                        { name: 'User Feedback', definition: 'Signals from users about whether outputs are useful, correct, or frustrating. Feedback helps improve prompts, routing, evals, and product design.' },
                        { name: 'Benchmark', definition: 'A standard test used to compare models or systems. Benchmarks are useful starting points, but your own task-specific evals matter more for product decisions.' },
                        { name: 'A/B Test', definition: 'A comparison where users or metrics determine which of two versions performs better. In AI apps, A/B tests can compare prompts, models, workflows, or UI choices.' }
                    ]
                },
                'takeaways': {
                    label: 'Key Takeaways',
                    terms: [
                        { name: 'Builder\'s Starting Point', definition: 'The practical first step before building: explore model options, understand costs and constraints, and match the tool to the use case. Week 1 emphasizes exploring before committing to an architecture.' },
                        { name: 'Model Landscape', definition: 'The current ecosystem of providers, open and closed models, model hubs, benchmarks, pricing, and hosting options. Builders need enough landscape awareness to choose wisely.' },
                        { name: 'Prompt Quality In, Quality Out', definition: 'The idea that vague prompts usually produce vague outputs. Treat prompts like mini specs when you want dependable results.' },
                        { name: 'One Task per Conversation', definition: 'A practical coding guideline to prevent context pollution. Fresh contexts help the model focus on the current goal instead of stale history.' },
                        { name: 'You Are Still the Reviewer', definition: 'The central rule for AI-assisted coding and building. The model can generate work, but the human remains responsible for correctness, security, and product judgment. This is the most important principle to carry forward from Week 1.' }
                    ]
                }
            }
        }
    };

    // 8. Cohort Knowledge Archive Interactions
    const pillarButtons = document.querySelectorAll('.pillar-btn');
    const subcategoriesContainer = document.getElementById('archive-subcategories');
    const consoleDefaultMsg = document.getElementById('console-default-msg');
    const termDetailsView = document.getElementById('term-details-view');
    const termTitle = document.getElementById('term-title');
    const termBadge = document.getElementById('term-badge');
    const termDefinition = document.getElementById('term-definition');
    const termSubCategory = document.getElementById('term-sub-category');
    const btnCopyDefinition = document.getElementById('btn-copy-definition');
    const notesSection = document.getElementById('glossary-notes-section');
    const notesScrollList = document.getElementById('notes-scroll-list');
    const searchInput = document.getElementById('archive-search');

    let activePillar = 'llm';
    let activeSubcategory = '';
    let selectedTerm = null;

    // Helper to render subcategories for the active pillar
    const renderSubcategories = (pillarId) => {
        subcategoriesContainer.innerHTML = '';
        const subcats = glossaryData[pillarId].subcategories;
        
        Object.keys(subcats).forEach((subcatKey, idx) => {
            const subcat = subcats[subcatKey];
            const chip = document.createElement('button');
            chip.className = 'subcategory-chip';
            if (idx === 0) {
                chip.classList.add('active');
                activeSubcategory = subcatKey;
            }
            chip.textContent = subcat.label;
            chip.setAttribute('data-subcat', subcatKey);
            
            chip.addEventListener('click', () => {
                playClick();
                document.querySelectorAll('.subcategory-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeSubcategory = subcatKey;
                if (searchInput) searchInput.value = ''; // clear search when category is selected
                renderTermsForCategory(pillarId, subcatKey);
            });
            
            subcategoriesContainer.appendChild(chip);
        });

        if (activeSubcategory) {
            renderTermsForCategory(pillarId, activeSubcategory);
        }
    };

    // Helper to display a single term's details
    const showTermDetails = (term, pillarName, subcategoryLabel) => {
        if (!term) return;
        selectedTerm = term;
        if (consoleDefaultMsg) consoleDefaultMsg.style.display = 'none';
        if (termDetailsView) termDetailsView.style.display = 'flex';
        
        if (termTitle) termTitle.textContent = term.name;
        if (termBadge) termBadge.textContent = pillarName.toUpperCase();
        if (termDefinition) termDefinition.textContent = term.definition;
        if (termSubCategory) termSubCategory.textContent = `Subcategory: ${subcategoryLabel}`;
        
        if (btnCopyDefinition) {
            btnCopyDefinition.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                COPY TELEMETRY
            `;
            btnCopyDefinition.classList.remove('copied');
        }

        // Highlight active card in scroll list
        document.querySelectorAll('.note-card').forEach(card => {
            const h5 = card.querySelector('h5');
            if (h5 && h5.textContent === term.name) {
                card.classList.add('active-term');
            } else {
                card.classList.remove('active-term');
            }
        });
    };

    // Helper to render the notes and terms list for a category
    const renderTermsForCategory = (pillarId, subcatKey) => {
        if (!notesScrollList || !notesSection) return;
        notesScrollList.innerHTML = '';
        notesSection.style.display = 'flex';
        
        const pillar = glossaryData[pillarId];
        const subcat = pillar.subcategories[subcatKey];
        const terms = subcat.terms;

        terms.forEach((term, idx) => {
            const card = document.createElement('div');
            card.className = 'note-card';
            if (idx === 0) {
                card.classList.add('active-term');
                showTermDetails(term, pillar.title, subcat.label);
            }

            card.innerHTML = `
                <h5>${term.name}</h5>
                <p>${term.definition.substring(0, 95)}...</p>
            `;

            card.addEventListener('click', () => {
                playClick();
                showTermDetails(term, pillar.title, subcat.label);
            });

            notesScrollList.appendChild(card);
        });

        notesScrollList.scrollTop = 0;
    };

    // Copy to clipboard functionality
    if (btnCopyDefinition) {
        btnCopyDefinition.addEventListener('click', () => {
            if (!selectedTerm) return;
            navigator.clipboard.writeText(`${selectedTerm.name}: ${selectedTerm.definition}`).then(() => {
                playSuccess();
                btnCopyDefinition.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    COPIED SECURELY!
                `;
                btnCopyDefinition.classList.add('copied');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // Search functionality across the entire database
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                document.querySelectorAll('.subcategory-chip').forEach(c => {
                    if (c.classList.contains('active')) {
                        const subcatKey = c.getAttribute('data-subcat');
                        renderTermsForCategory(activePillar, subcatKey);
                    }
                });
                return;
            }

            const results = [];
            Object.keys(glossaryData).forEach(pillarKey => {
                const pillar = glossaryData[pillarKey];
                Object.keys(pillar.subcategories).forEach(subcatKey => {
                    const subcat = pillar.subcategories[subcatKey];
                    subcat.terms.forEach(term => {
                        if (term.name.toLowerCase().includes(query) || term.definition.toLowerCase().includes(query)) {
                            results.push({
                                term,
                                pillarTitle: pillar.title,
                                subcatLabel: subcat.label
                            });
                        }
                    });
                });
            });

            if (!notesScrollList) return;
            notesScrollList.innerHTML = '';
            document.querySelectorAll('.subcategory-chip').forEach(c => c.classList.remove('active'));

            if (results.length === 0) {
                notesScrollList.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary); font-family: monospace;">
                        <p>> NO CORRESPONDING TELEMETRY FOUND FOR "${query.toUpperCase()}"</p>
                    </div>
                `;
                if (consoleDefaultMsg) consoleDefaultMsg.style.display = 'flex';
                if (termDetailsView) termDetailsView.style.display = 'none';
                return;
            }

            results.forEach((res, idx) => {
                const card = document.createElement('div');
                card.className = 'note-card';
                if (idx === 0) {
                    card.classList.add('active-term');
                    showTermDetails(res.term, res.pillarTitle, res.subcatLabel);
                }

                card.innerHTML = `
                    <h5>${res.term.name}</h5>
                    <span style="font-size: 0.75rem; color: var(--neon-purple); display: block; margin-bottom: 0.2rem; font-family: var(--font-heading);">${res.subcatLabel}</span>
                    <p>${res.term.definition.substring(0, 95)}...</p>
                `;

                card.addEventListener('click', () => {
                    playClick();
                    showTermDetails(res.term, res.pillarTitle, res.subcatLabel);
                });

                notesScrollList.appendChild(card);
            });

            notesScrollList.scrollTop = 0;
        });
    }

    // Set up Pillar Navigation listeners
    pillarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            pillarButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activePillar = btn.getAttribute('data-pillar');
            if (searchInput) searchInput.value = '';
            renderSubcategories(activePillar);
        });
    });

    // Initialize with first pillar
    if (document.getElementById('chapter-knowledge-archive')) {
        renderSubcategories('llm');
    }

    // ==========================================================================
    // 9. COHORT KNOWLEDGE ARCHIVE (WEEK 2 GLOSSARY VAULT) DATA & LOGIC
    // ==========================================================================

    const glossaryDataV2 = {
        rag: {
            title: 'RAG Architectures',
            subcategories: {
                'rag-basics': {
                    label: 'RAG Basics',
                    terms: [
                        { name: 'Retrieval-Augmented Generation (RAG)', definition: 'A system that looks up relevant information in a private or external corpus at query time, inserts that text into the LLM\'s prompt, and uses it to ground the generated answer.' },
                        { name: 'HyDE (Hypothetical Document Embeddings)', definition: 'A technique that takes a user query, uses an LLM to generate a fake "ideal answer" (a hypothesis), and then embeds that fake answer to search the vector database.' }
                    ]
                },
                'advanced-rag': {
                    label: 'Advanced RAG',
                    terms: [
                        { name: 'Graph RAG', definition: 'A system that models a document corpus as a knowledge graph of entities and relationships, allowing the LLM to retrieve information by traversing connected edges to answer complex, multi-hop questions.' },
                        { name: 'Multimodal RAG', definition: 'A RAG system capable of retrieving and reasoning across multiple data formats, including text, images, video, audio, and code.' },
                        { name: 'Branched RAG', definition: 'An architecture that retrieves information across multiple different sources (such as semantic search, keyword search, and SQL databases) and then merges the results.' }
                    ]
                },
                'agentic-rag': {
                    label: 'Agentic & Dynamic RAG',
                    terms: [
                        { name: 'Agentic RAG', definition: 'A system where retrieval is embedded in a multi-agent workflow (planner, retriever, critic). Instead of a one-shot query, the AI uses a "think-act-observe" loop to autonomously decide if it has gathered enough context or if it needs to search again.' },
                        { name: 'Adaptive RAG', definition: 'A system that dynamically chooses the best retrieval strategy (dense, sparse, or multi-hop) on a per-query basis.' },
                        { name: 'Corrective RAG (CRAG)', definition: 'A RAG architectural pattern where the LLM critiques the retrieved results and corrects any errors before generating the final answer.' },
                        { name: 'Self-RAG', definition: 'An architecture where the model utilizes a critic and generator loop to self-check retrieved passages, reducing hallucinations.' }
                    ]
                }
            }
        },
        retrieval: {
            title: 'Retrieval & Indexing',
            subcategories: {
                'vector-search': {
                    label: 'Vector Search',
                    terms: [
                        { name: 'Vector Database', definition: 'A specialized database designed to store millions of embeddings and their metadata, optimized to rapidly return the closest vectors to a user\'s query.' },
                        { name: 'Embedding (Text Embedding)', definition: 'A numerical representation (a vector) that captures the semantic meaning of a piece of text. Texts with similar meanings map to vectors that are close together in dimensional space, while different meanings are placed far apart.' },
                        { name: 'Contrastive Learning', definition: 'The training method for embedding models where the neural net is shown millions of text pairs labeled as "similar" or "different." The model adjusts its weights to pull similar pairs close together and push different pairs far apart.' },
                        { name: 'Approximate Nearest-Neighbour (ANN)', definition: 'An index used within vector databases to provide log-time, extremely fast search to find the neighbourhood of vectors closest to a query.' }
                    ]
                },
                'search-algorithms': {
                    label: 'Search Algorithms',
                    terms: [
                        { name: 'Dense Retrieval', definition: 'A search method that encodes both the query and the chunks into vectors to find matches based on semantic meaning (via cosine similarity), allowing the system to match synonyms and paraphrased text.' },
                        { name: 'Sparse Retrieval (BM25)', definition: 'A classic keyword search method that represents documents as sparse vectors (one dimension per word in the vocabulary) to perfectly match exact terms, acronyms, or IDs.' },
                        { name: 'Hybrid Retrieval', definition: 'A search pipeline that combines the strengths of dense (vector/semantic) retrieval with sparse (keyword/BM25) retrieval to maximize recall.' },
                        { name: 'Reciprocal Rank Fusion (RRF)', definition: 'A mathematical formula—score(doc) = 1 / (k + rank)—used in hybrid search to seamlessly merge the ranked lists from dense retrieval and sparse retrieval.' }
                    ]
                },
                'advanced-retrieval': {
                    label: 'Advanced Retrieval',
                    terms: [
                        { name: 'Bi-encoder', definition: 'A retrieval model that encodes a user\'s query and the document chunks separately. It is fast enough to scan millions of documents in milliseconds, but lacks the high precision of models that read the query and chunk together.' },
                        { name: 'Cross-encoder', definition: 'A reranking model that feeds both the query and the chunk into the model together, allowing it to evaluate them simultaneously. It outputs a highly precise relevance score but is computationally slow, usually only running on the top 50 results.' },
                        { name: 'ColBERT (Multi-vector)', definition: 'An advanced retrieval strategy that stores one vector per token instead of a single vector per chunk, evaluating matches by summing the best per-token matches ("MaxSim").' },
                        { name: 'Cypher', definition: 'A query language used to search graph databases by describing the specific pattern or shape of the relationships you want to find (e.g., nodes connected by specific edges).' }
                    ]
                }
            }
        },
        context: {
            title: 'Context & Memory',
            subcategories: {
                'chunking-strategies': {
                    label: 'Chunking Strategies',
                    terms: [
                        { name: 'Semantic Chunking', definition: 'A chunking strategy that splits documents based on meaning rather than token limits. It embeds individual sentences and cuts the text where a drop in cosine similarity indicates a shift in topic.' },
                        { name: 'Parent-child trick (Small-to-Big Retrieval)', definition: 'A structural chunking strategy where very small chunks (e.g., 150 tokens) are embedded to ensure precise search matches, but the larger parent chunk (e.g., 1000 tokens) is passed to the LLM to provide adequate reading context.' }
                    ]
                },
                'context-management': {
                    label: 'Context Management',
                    terms: [
                        { name: 'Context Engineering', definition: 'The discipline of deliberately curating exactly what an LLM sees in its context window during a given turn. This goes beyond the prompt to include retrieved documents, memory, conversation history, tool outputs, and structured schemas.' },
                        { name: 'Context Rot', definition: 'A phenomenon where an LLM\'s output quality decays as its context window gets longer, causing the model to become repetitive, forgetful, and less precise.' },
                        { name: 'Contextual Extraction', definition: 'A context compression technique where an LLM is asked to analyze a chunk of text and output only the specific sentences that are relevant to the user\'s query.' },
                        { name: 'Lost in the Middle', definition: 'A known limitation of LLMs where the model\'s accuracy drops significantly when trying to process information located in the middle of a long prompt or context window.' },
                        { name: 'Prompt Compression', definition: 'A technique that drops low-information or filler tokens from the context to save space, maintaining the original order and meaning while reducing token count.' }
                    ]
                },
                'memory-systems': {
                    label: 'Memory Systems',
                    terms: [
                        { name: 'Long-term Memory', definition: 'Persistent memory scoped to a specific user across all sessions, often stored in a vector database or KV store to track facts, preferences, and past interactions.' },
                        { name: 'Short-term Memory', definition: 'In-memory storage scoped to the current conversation session, tracking the recent message history, agent thoughts, and tool results.' },
                        { name: 'Working Memory', definition: 'The memory scoped strictly to the current turn of an agent, bounded by the LLM\'s token limit, which includes the prompt, retrieved chunks, and the latest tool outputs.' }
                    ]
                },
                'evaluation': {
                    label: 'Evaluation & Quality',
                    terms: [
                        { name: 'Golden Dataset', definition: 'A critical evaluation tool consisting of a curated ground truth set of questions, expected answers, and expected source documents used to measure the quality of a RAG pipeline.' }
                    ]
                }
            }
        }
    };

    // 10. Cohort Knowledge Archive Interactions (Week 2)
    const pillarV2Buttons = document.querySelectorAll('.pillar-v2-btn');
    const subcategoriesV2Container = document.getElementById('archive-v2-subcategories');
    const consoleV2DefaultMsg = document.getElementById('console-v2-default-msg');
    const termV2DetailsView = document.getElementById('term-v2-details-view');
    const termV2Title = document.getElementById('term-v2-title');
    const termV2Badge = document.getElementById('term-v2-badge');
    const termV2Definition = document.getElementById('term-v2-definition');
    const termV2SubCategory = document.getElementById('term-v2-sub-category');
    const btnV2CopyDefinition = document.getElementById('btn-v2-copy-definition');
    const notesV2Section = document.getElementById('glossary-v2-notes-section');
    const notesV2ScrollList = document.getElementById('notes-v2-scroll-list');
    const searchV2Input = document.getElementById('archive-v2-search');

    let activeV2Pillar = 'rag';
    let activeV2Subcategory = '';
    let selectedV2Term = null;

    const renderV2Subcategories = (pillarId) => {
        if (!subcategoriesV2Container) return;
        subcategoriesV2Container.innerHTML = '';
        const subcats = glossaryDataV2[pillarId].subcategories;
        
        Object.keys(subcats).forEach((subcatKey, idx) => {
            const subcat = subcats[subcatKey];
            const chip = document.createElement('button');
            chip.className = 'subcategory-chip';
            if (idx === 0) {
                chip.classList.add('active');
                activeV2Subcategory = subcatKey;
            }
            chip.textContent = subcat.label;
            chip.setAttribute('data-subcat', subcatKey);
            
            chip.addEventListener('click', () => {
                playClick();
                subcategoriesV2Container.querySelectorAll('.subcategory-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeV2Subcategory = subcatKey;
                if (searchV2Input) searchV2Input.value = '';
                renderV2TermsForCategory(pillarId, subcatKey);
            });
            
            subcategoriesV2Container.appendChild(chip);
        });

        if (activeV2Subcategory) {
            renderV2TermsForCategory(pillarId, activeV2Subcategory);
        }
    };

    const showV2TermDetails = (term, pillarName, subcategoryLabel) => {
        if (!term) return;
        selectedV2Term = term;
        if (consoleV2DefaultMsg) consoleV2DefaultMsg.style.display = 'none';
        if (termV2DetailsView) termV2DetailsView.style.display = 'flex';
        
        if (termV2Title) termV2Title.textContent = term.name;
        if (termV2Badge) termV2Badge.textContent = pillarName.toUpperCase();
        if (termV2Definition) termV2Definition.textContent = term.definition;
        if (termV2SubCategory) termV2SubCategory.textContent = `Subcategory: ${subcategoryLabel}`;
        
        if (btnV2CopyDefinition) {
            btnV2CopyDefinition.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                COPY TELEMETRY
            `;
            btnV2CopyDefinition.classList.remove('copied');
        }

        if (notesV2ScrollList) {
            notesV2ScrollList.querySelectorAll('.note-card').forEach(card => {
                const h5 = card.querySelector('h5');
                if (h5 && h5.textContent === term.name) {
                    card.classList.add('active-term');
                } else {
                    card.classList.remove('active-term');
                }
            });
        }
    };

    const renderV2TermsForCategory = (pillarId, subcatKey) => {
        if (!notesV2ScrollList || !notesV2Section) return;
        notesV2ScrollList.innerHTML = '';
        notesV2Section.style.display = 'flex';
        
        const pillar = glossaryDataV2[pillarId];
        const subcat = pillar.subcategories[subcatKey];
        const terms = subcat.terms;

        terms.forEach((term, idx) => {
            const card = document.createElement('div');
            card.className = 'note-card';
            if (idx === 0) {
                card.classList.add('active-term');
                showV2TermDetails(term, pillar.title, subcat.label);
            }

            card.innerHTML = `
                <h5>${term.name}</h5>
                <p>${term.definition.substring(0, 95)}...</p>
            `;

            card.addEventListener('click', () => {
                playClick();
                showV2TermDetails(term, pillar.title, subcat.label);
            });

            notesV2ScrollList.appendChild(card);
        });

        notesV2ScrollList.scrollTop = 0;
    };

    if (btnV2CopyDefinition) {
        btnV2CopyDefinition.addEventListener('click', () => {
            if (!selectedV2Term) return;
            navigator.clipboard.writeText(`${selectedV2Term.name}: ${selectedV2Term.definition}`).then(() => {
                playSuccess();
                btnV2CopyDefinition.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    COPIED SECURELY!
                `;
                btnV2CopyDefinition.classList.add('copied');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    if (searchV2Input) {
        searchV2Input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                subcategoriesV2Container.querySelectorAll('.subcategory-chip').forEach(c => {
                    if (c.classList.contains('active')) {
                        const subcatKey = c.getAttribute('data-subcat');
                        renderV2TermsForCategory(activeV2Pillar, subcatKey);
                    }
                });
                return;
            }

            const results = [];
            Object.keys(glossaryDataV2).forEach(pillarKey => {
                const pillar = glossaryDataV2[pillarKey];
                Object.keys(pillar.subcategories).forEach(subcatKey => {
                    const subcat = pillar.subcategories[subcatKey];
                    subcat.terms.forEach(term => {
                        if (term.name.toLowerCase().includes(query) || term.definition.toLowerCase().includes(query)) {
                            results.push({
                                term,
                                pillarTitle: pillar.title,
                                subcatLabel: subcat.label
                            });
                        }
                    });
                });
            });

            if (!notesV2ScrollList) return;
            notesV2ScrollList.innerHTML = '';
            subcategoriesV2Container.querySelectorAll('.subcategory-chip').forEach(c => c.classList.remove('active'));

            if (results.length === 0) {
                notesV2ScrollList.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary); font-family: monospace;">
                        <p>> NO CORRESPONDING TELEMETRY FOUND FOR "${query.toUpperCase()}"</p>
                    </div>
                `;
                if (consoleV2DefaultMsg) consoleV2DefaultMsg.style.display = 'flex';
                if (termV2DetailsView) termV2DetailsView.style.display = 'none';
                return;
            }

            results.forEach((res, idx) => {
                const card = document.createElement('div');
                card.className = 'note-card';
                if (idx === 0) {
                    card.classList.add('active-term');
                    showV2TermDetails(res.term, res.pillarTitle, res.subcatLabel);
                }

                card.innerHTML = `
                    <h5>${res.term.name}</h5>
                    <span style="font-size: 0.75rem; color: var(--neon-purple); display: block; margin-bottom: 0.2rem; font-family: var(--font-heading);">${res.subcatLabel}</span>
                    <p>${res.term.definition.substring(0, 95)}...</p>
                `;

                card.addEventListener('click', () => {
                    playClick();
                    showV2TermDetails(res.term, res.pillarTitle, res.subcatLabel);
                });

                notesV2ScrollList.appendChild(card);
            });

            notesV2ScrollList.scrollTop = 0;
        });
    }

    pillarV2Buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            pillarV2Buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeV2Pillar = btn.getAttribute('data-pillar');
            if (searchV2Input) searchV2Input.value = '';
            renderV2Subcategories(activeV2Pillar);
        });
    });

    if (document.getElementById('chapter-v2-knowledge-archive')) {
        renderV2Subcategories('rag');
    }

    // ==========================================================================
    // 10.5. COHORT KNOWLEDGE ARCHIVE (WEEK 4 GLOSSARY VAULT) DATA & LOGIC
    // ==========================================================================

    const glossaryDataV4 = {
        math: {
            title: 'Math & Classification',
            subcategories: {
                'basic-math': {
                    label: 'Basic Math',
                    terms: [
                        { name: 'Accuracy', definition: 'Out of all cases, how many were correct. Formula: Right / Total. Easy to explain, but weak when evaluated on highly imbalanced datasets.' },
                        { name: 'Precision', definition: 'When the model predicts a positive outcome, how often is it right. Formula: True Positives / (True Positives + False Positives). Optimize when false alarms are expensive.' },
                        { name: 'Recall', definition: 'Of all actual positive cases, how many did the model identify. Formula: True Positives / (True Positives + False Negatives). Optimize when missing a positive case is high risk.' },
                        { name: 'F1 Score', definition: 'A single performance metric balancing precision and recall. Formula: 2 × Precision × Recall / (Precision + Recall). Key when you need a balance of both.' },
                        { name: 'Pass rate', definition: 'How often a model\'s output passes a deterministic programmatic checker. Crucial for JSON schemas, parser validity, and code syntax.' }
                    ]
                },
                'classification-adv': {
                    label: 'Advanced Classification',
                    terms: [
                        { name: 'Exact Match (EM)', definition: 'Measures whether the model\'s output exactly matches the gold label string. Standard in multiple choice, deterministic routing, and classification tasks.' },
                        { name: 'Macro F1', definition: 'Averages the F1 score for each class individually, giving equal weight. Important when small minority classes are as critical as major ones.' },
                        { name: 'Micro F1', definition: 'Pools all class decisions before computing F1. Measures overall volume performance; in single-label multiclass tasks, it often equals accuracy.' },
                        { name: 'Balanced accuracy', definition: 'The average of recall scores across all classes. Highly recommended when classes are imbalanced and plain accuracy masks errors.' },
                        { name: 'AUC / PR-AUC', definition: 'Area Under Curve metrics measuring ranking quality across probability thresholds. PR-AUC is more sensitive and accurate when positives are rare.' },
                        { name: 'Calibration error', definition: 'Measures whether the model\'s confidence matches reality. If the model is 80% confident, it should be correct about 8 out of 10 times.' }
                    ]
                }
            }
        },
        generation: {
            title: 'Generation & Similarity',
            subcategories: {
                'similarity-metrics': {
                    label: 'Similarity & Overlap',
                    terms: [
                        { name: 'BLEU', definition: 'Measures n-gram overlap with reference text. Historically popular for machine translation, but weak when multiple valid phrasings exist.' },
                        { name: 'ROUGE-1/2/L', definition: 'Measures word overlap and longest common subsequence. Standard for summarization recall (verifying if key details were included).' },
                        { name: 'METEOR', definition: 'Measures text overlap incorporating stemming and synonym dictionaries. More forgiving and human-aligned than BLEU for phrasing variations.' },
                        { name: 'BERTScore', definition: 'Evaluates semantic similarity between tokens using contextual embeddings, capturing matching meaning even if different words are used.' },
                        { name: 'Embedding cosine', definition: 'Measures the cosine of the angle between two embedding vectors. Essential for semantic matching, clustering, and duplicate checking.' },
                        { name: 'Perplexity', definition: 'Measures how surprising a sequence of words is to a language model. Useful for fluency and language structure diagnostics.' }
                    ]
                },
                'llm-judges': {
                    label: 'LLM-as-a-Judge',
                    terms: [
                        { name: 'Relevance', definition: 'Measures how well the generated response directly answers the user query. Validates focus and usefulness, filtering out distractions.' },
                        { name: 'Coherence', definition: 'Assesses whether the response makes logical sense as a cohesive whole. Crucial for long-form reasoning, summaries, and agent explanations.' },
                        { name: 'Conciseness', definition: 'Measures if the agent answers the question without redundant bloat, evaluated via rubrics or strict token budgets.' },
                        { name: 'Tone / style alignment', definition: 'Checks if the output matches specific brand voices, personas, or safety rules using graded rubrics.' },
                        { name: 'Instruction following', definition: 'A pass/fail or graded assessment checking if the agent obeyed explicit format constraints (JSON, markdown, word count, exclusions).' },
                        { name: 'Win rate', definition: 'How often output A is preferred over output B in pairwise LLM judging. Formula: wins / total comparisons.' }
                    ]
                }
            }
        },
        grounding: {
            title: 'RAG & Grounding',
            subcategories: {
                'rag-grounding': {
                    label: 'RAG Evals',
                    terms: [
                        { name: 'Faithfulness', definition: 'Checks whether generated claims are supported strictly by retrieved documents. Critical for catching hallucinations.' },
                        { name: 'Response Relevancy', definition: 'Checks if the final answer directly addresses the query. Grounded but irrelevant answers score low.' },
                        { name: 'Context Precision', definition: 'Measures if retrieved chunks are highly relevant. High precision means minimal distracting or irrelevant context.' },
                        { name: 'Context Recall', definition: 'Measures whether retrieved context contains all necessary evidence. If context recall is low, the generator lacks facts.' },
                        { name: 'Citation accuracy', definition: 'Verifies whether cited sources in the response support the exact claims made. Crucial for legal, medical, and policy assistants.' },
                        { name: 'Groundedness', definition: 'Measures if the output is anchored strictly in the provided documents rather than model pretraining memory.' }
                    ]
                },
                'task-success-v4': {
                    label: 'Task Success',
                    terms: [
                        { name: 'Code pass@k', definition: 'Measures if at least one of k generated code solutions passes functional tests. pass@1 is standard for production.' },
                        { name: 'SQL execution accuracy', definition: 'Verifies if generated SQL queries run and return correct data compared to reference execution.' },
                        { name: 'Tool-call accuracy', definition: 'Checks if correct tools are selected with correct parameters. Evaluated on selection accuracy and execution success.' },
                        { name: 'Task completion rate', definition: 'Measures if the agent successfully achieved its end-to-end goal. Standard for browser automation and complex workflows.' },
                        { name: 'Plan quality', definition: 'Graded metric checking if the generated plan is complete, ordered, feasible, and not overcomplicated.' },
                        { name: 'Human escalation accuracy', definition: 'Measures if the model escalates to human agents when it should and resolves when it can, tracking false and missed escalations.' }
                    ]
                }
            }
        },
        safety: {
            title: 'Risk & Ops Metrics',
            subcategories: {
                'risk-metrics': {
                    label: 'Risk & Safety',
                    terms: [
                        { name: 'Toxicity / hate', definition: 'Measures harmful, abusive, or biased content in inputs or outputs. Evaluated using safety classifier scoring.' },
                        { name: 'Jailbreak success rate', definition: 'Measures how often safety guardrails are bypassed by adversarial prompts. Formula: successful attacks / total attacks.' },
                        { name: 'PII leakage', definition: 'Tracks whether sensitive personal data (emails, credit cards, SSNs) appears in outputs. Measures exact and near-match leaks.' },
                        { name: 'Refusal precision', definition: 'When the model refuses, was the refusal correct? Low precision means safe user queries are blocked.' },
                        { name: 'Refusal recall', definition: 'Of unsafe inputs, how many were correctly refused. Low recall indicates unsafe responses allowed.' },
                        { name: 'Bias / fairness gap', definition: 'Compares error rates across demographic groups. Simple form: group A error rate minus group B error rate.' }
                    ]
                },
                'ops-metrics': {
                    label: 'Ops & Cross-checks',
                    terms: [
                        { name: 'Latency', definition: 'Measures duration. Critical to track Time to First Token (TTFT), total generation duration, and tail latency (p95).' },
                        { name: 'Cost per successful task', definition: 'Total spend divided by completed tasks. Essential for agents that use loop retries.' },
                        { name: 'Containment / deflection', definition: 'How often AI resolves issues without human handoff. Must pair with quality filters.' },
                        { name: 'Retry / repair rate', definition: 'How often the system must regenerate, retry tools, or ask humans to correct. Early reliability indicator.' },
                        { name: 'Drift', definition: 'Metric change over time on a static eval set, run weekly to catch prompt, model, or traffic drift.' },
                        { name: 'Judge agreement', definition: 'How often LLM judges and human raters give the same grade. Measured via agreement rate or Kappa.' }
                    ]
                }
            }
        }
    };

    // 10.6. Cohort Knowledge Archive Interactions (Week 4)
    const pillarV4Buttons = document.querySelectorAll('.pillar-v4-btn');
    const subcategoriesV4Container = document.getElementById('archive-v4-subcategories');
    const consoleV4DefaultMsg = document.getElementById('console-v4-default-msg');
    const termV4DetailsView = document.getElementById('term-v4-details-view');
    const termV4Title = document.getElementById('term-v4-title');
    const termV4Badge = document.getElementById('term-v4-badge');
    const termV4Definition = document.getElementById('term-v4-definition');
    const termV4SubCategory = document.getElementById('term-v4-sub-category');
    const btnV4CopyDefinition = document.getElementById('btn-v4-copy-definition');
    const notesV4Section = document.getElementById('glossary-v4-notes-section');
    const notesV4ScrollList = document.getElementById('notes-v4-scroll-list');
    const searchV4Input = document.getElementById('archive-v4-search');

    let activeV4Pillar = 'math';
    let activeV4Subcategory = '';
    let selectedV4Term = null;

    const renderV4Subcategories = (pillarId) => {
        if (!subcategoriesV4Container) return;
        subcategoriesV4Container.innerHTML = '';
        const subcats = glossaryDataV4[pillarId].subcategories;
        
        Object.keys(subcats).forEach((subcatKey, idx) => {
            const subcat = subcats[subcatKey];
            const chip = document.createElement('button');
            chip.className = 'subcategory-chip';
            if (idx === 0) {
                chip.classList.add('active');
                activeV4Subcategory = subcatKey;
            }
            chip.textContent = subcat.label;
            chip.setAttribute('data-subcat', subcatKey);
            
            chip.addEventListener('click', () => {
                playClick();
                subcategoriesV4Container.querySelectorAll('.subcategory-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeV4Subcategory = subcatKey;
                if (searchV4Input) searchV4Input.value = '';
                renderV4TermsForCategory(pillarId, subcatKey);
            });
            
            subcategoriesV4Container.appendChild(chip);
        });

        if (activeV4Subcategory) {
            renderV4TermsForCategory(pillarId, activeV4Subcategory);
        }
    };

    const showV4TermDetails = (term, pillarName, subcategoryLabel) => {
        if (!term) return;
        selectedV4Term = term;
        if (consoleV4DefaultMsg) consoleV4DefaultMsg.style.display = 'none';
        if (termV4DetailsView) termV4DetailsView.style.display = 'flex';
        
        if (termV4Title) termV4Title.textContent = term.name;
        if (termV4Badge) termV4Badge.textContent = pillarName.toUpperCase();
        if (termV4Definition) termV4Definition.textContent = term.definition;
        if (termV4SubCategory) termV4SubCategory.textContent = `Subcategory: ${subcategoryLabel}`;
        
        if (btnV4CopyDefinition) {
            btnV4CopyDefinition.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                COPY TELEMETRY
            `;
            btnV4CopyDefinition.classList.remove('copied');
        }

        if (notesV4ScrollList) {
            notesV4ScrollList.querySelectorAll('.note-card').forEach(card => {
                const h5 = card.querySelector('h5');
                if (h5 && h5.textContent === term.name) {
                    card.classList.add('active-term');
                } else {
                    card.classList.remove('active-term');
                }
            });
        }
    };

    const renderV4TermsForCategory = (pillarId, subcatKey) => {
        if (!notesV4ScrollList || !notesV4Section) return;
        notesV4ScrollList.innerHTML = '';
        notesV4Section.style.display = 'flex';
        
        const pillar = glossaryDataV4[pillarId];
        const subcat = pillar.subcategories[subcatKey];
        const terms = subcat.terms;

        terms.forEach((term, idx) => {
            const card = document.createElement('div');
            card.className = 'note-card';
            if (idx === 0) {
                card.classList.add('active-term');
                showV4TermDetails(term, pillar.title, subcat.label);
            }

            card.innerHTML = `
                <h5>${term.name}</h5>
                <p>${term.definition.substring(0, 95)}...</p>
            `;

            card.addEventListener('click', () => {
                playClick();
                showV4TermDetails(term, pillar.title, subcat.label);
            });

            notesV4ScrollList.appendChild(card);
        });

        notesV4ScrollList.scrollTop = 0;
    };

    if (btnV4CopyDefinition) {
        btnV4CopyDefinition.addEventListener('click', () => {
            if (!selectedV4Term) return;
            navigator.clipboard.writeText(`${selectedV4Term.name}: ${selectedV4Term.definition}`).then(() => {
                playSuccess();
                btnV4CopyDefinition.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    COPIED SECURELY!
                `;
                btnV4CopyDefinition.classList.add('copied');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    if (searchV4Input) {
        searchV4Input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                subcategoriesV4Container.querySelectorAll('.subcategory-chip').forEach(c => {
                    if (c.classList.contains('active')) {
                        const subcatKey = c.getAttribute('data-subcat');
                        renderV4TermsForCategory(activeV4Pillar, subcatKey);
                    }
                });
                return;
            }

            const results = [];
            Object.keys(glossaryDataV4).forEach(pillarKey => {
                const pillar = glossaryDataV4[pillarKey];
                Object.keys(pillar.subcategories).forEach(subcatKey => {
                    const subcat = pillar.subcategories[subcatKey];
                    subcat.terms.forEach(term => {
                        if (term.name.toLowerCase().includes(query) || term.definition.toLowerCase().includes(query)) {
                            results.push({
                                term,
                                pillarTitle: pillar.title,
                                subcatLabel: subcat.label
                            });
                        }
                    });
                });
            });

            if (!notesV4ScrollList) return;
            notesV4ScrollList.innerHTML = '';
            subcategoriesV4Container.querySelectorAll('.subcategory-chip').forEach(c => c.classList.remove('active'));

            if (results.length === 0) {
                notesV4ScrollList.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary); font-family: monospace;">
                        <p>> NO CORRESPONDING TELEMETRY FOUND FOR "${query.toUpperCase()}"</p>
                    </div>
                `;
                if (consoleV4DefaultMsg) consoleV4DefaultMsg.style.display = 'flex';
                if (termV4DetailsView) termV4DetailsView.style.display = 'none';
                return;
            }

            results.forEach((res, idx) => {
                const card = document.createElement('div');
                card.className = 'note-card';
                if (idx === 0) {
                    card.classList.add('active-term');
                    showV4TermDetails(res.term, res.pillarTitle, res.subcatLabel);
                }

                card.innerHTML = `
                    <h5>${res.term.name}</h5>
                    <span style="font-size: 0.75rem; color: var(--neon-purple); display: block; margin-bottom: 0.2rem; font-family: var(--font-heading);">${res.subcatLabel}</span>
                    <p>${res.term.definition.substring(0, 95)}...</p>
                `;

                card.addEventListener('click', () => {
                    playClick();
                    showV4TermDetails(res.term, res.pillarTitle, res.subcatLabel);
                });

                notesV4ScrollList.appendChild(card);
            });

            notesV4ScrollList.scrollTop = 0;
        });
    }

    pillarV4Buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            pillarV4Buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeV4Pillar = btn.getAttribute('data-pillar');
            if (searchV4Input) searchV4Input.value = '';
            renderV4Subcategories(activeV4Pillar);
        });
    });

    if (document.getElementById('chapter-v4-knowledge-archive')) {
        renderV4Subcategories('math');
    }

    // ==========================================================================
    // 11. VOYAGE 4 SIMULATOR INTERACTION LOGIC
    // ==========================================================================
    
    const simProfiles = {
        rag: {
            title: 'RAG Knowledge System',
            desc: 'Grounding AI reasoning in retrieval-augmented databanks to ensure factual, non-hallucinating responses.',
            badge: 'RAG ACTIVE',
            badgeClass: 'cyan',
            metrics: [
                'Faithfulness (verifying claims in context)',
                'Response Relevancy (checking if answer addresses question)',
                'Context Recall (checking if retrieved documents contain answer)',
                'Context Precision (minimizing noise/distractions)',
                'Latency (TTFT and total duration)'
            ],
            diagnosis: 'RAG DIAGNOSIS: If context recall is low, fix retrieval. If context precision is low, fix ranking/filtering. If both are good but faithfulness is low, fix generation, prompts, or model choice.',
            evalRun: [
                { text: 'Initialising evaluation pipeline for RAG system...', delay: 500, type: 'info' },
                { text: 'Loading "Golden Dataset" (100 synthetic QA pairs)...', delay: 800, type: 'info' },
                { text: 'Executing retrieval pipeline on Pinecone database...', delay: 1000, type: 'info' },
                { text: 'Running LLM-as-a-Judge scans for Faithfulness & Relevancy...', delay: 1200, type: 'info' },
                { text: 'Scanning for context leaks and hallucination thresholds...', delay: 800, type: 'info' },
                { text: 'Evaluation complete. Reporting telemetry...', delay: 500, type: 'success' }
            ],
            scores: [
                { name: 'Faithfulness', val: '96%', target: '>= 95%', fill: '96%' },
                { name: 'Answer Relevancy', val: '91%', target: '>= 90%', fill: '91%' },
                { name: 'Context Recall', val: '88%', target: '>= 90%', fill: '88%', warning: true },
                { name: 'Context Precision', val: '94%', target: '>= 90%', fill: '94%' },
                { name: 'p95 Latency', val: '420ms', target: '< 500ms', fill: '84%' }
            ]
        },
        coding: {
            title: 'Autonomous Coding Agent',
            desc: 'Generating functional code, debugging errors, and resolving repository tasks autonomously.',
            badge: 'AGENT ACTIVE',
            badgeClass: 'green',
            metrics: [
                'Code pass@k (functional test pass rates)',
                'Schema Validity (tool call parameter conformity)',
                'Task Completion Rate (end-to-end issues resolved)',
                'Plan Quality (judge-graded logical steps)',
                'Cost per successful task'
            ],
            diagnosis: 'CODING DIAGNOSIS: If pass@k is low, verify test harnesses and enhance prompt constraints. If cost is high, implement semantic caching to intercept redundant test runs.',
            evalRun: [
                { text: 'Initialising software agent test harness...', delay: 500, type: 'info' },
                { text: 'Loading SWE-bench target issues...', delay: 800, type: 'info' },
                { text: 'Executing Agent loops (Thought -> Action -> Observe)...', delay: 1200, type: 'info' },
                { text: 'Running generated scripts in sandbox container...', delay: 1000, type: 'info' },
                { text: 'Running unit test validation checks...', delay: 900, type: 'info' },
                { text: 'Test run complete. Telemetry compiled.', delay: 500, type: 'success' }
            ],
            scores: [
                { name: 'Code pass@1', val: '82%', target: '>= 80%', fill: '82%' },
                { name: 'Tool-call Accuracy', val: '97%', target: '>= 95%', fill: '97%' },
                { name: 'Task Completion', val: '78%', target: '>= 75%', fill: '78%' },
                { name: 'Plan Quality', val: '92%', target: '>= 90%', fill: '92%' },
                { name: 'Cost per Task', val: '$0.084', target: '< $0.10', fill: '84%' }
            ]
        },
        support: {
            title: 'Customer Support Bot',
            desc: 'Automating multi-turn customer dialogues, resolving billing queries, and executing account actions.',
            badge: 'BOT ACTIVE',
            badgeClass: 'purple',
            metrics: [
                'Containment / Deflection (resolving without humans)',
                'Tone / Style brand compliance',
                'Refusal Precision (avoiding false refusals)',
                'PII Leakage checks',
                'Human Escalation Accuracy'
            ],
            diagnosis: 'SUPPORT DIAGNOSIS: Keep Refusal Precision high to prevent blocking legitimate billing requests. Ensure PII scanner filters all account token outputs before they exit the buffer.',
            evalRun: [
                { text: 'Simulating 200 multi-turn user support interactions...', delay: 600, type: 'info' },
                { text: 'Checking dialogue containment boundaries...', delay: 800, type: 'info' },
                { text: 'Auditing brand tone compliance and sentiment...', delay: 1000, type: 'info' },
                { text: 'Scanning customer transcripts for PII leaks...', delay: 1000, type: 'info' },
                { text: 'Verifying escalation protocols...', delay: 700, type: 'info' },
                { text: 'Verification complete. Publishing telemetry scores...', delay: 500, type: 'success' }
            ],
            scores: [
                { name: 'Containment Rate', val: '86%', target: '>= 80%', fill: '86%' },
                { name: 'Tone Compliance', val: '95%', target: '>= 95%', fill: '95%' },
                { name: 'Refusal Precision', val: '98%', target: '>= 95%', fill: '98%' },
                { name: 'PII Leakage Rate', val: '0%', target: '0%', fill: '100%' },
                { name: 'Escalation Accuracy', val: '92%', target: '>= 90%', fill: '92%' }
            ]
        },
        safety: {
            title: 'Safety Shield Guardrail',
            desc: 'Intercepting input prompt attacks (jailbreaks) and sanitizing model outputs for toxicity/unsafe topics.',
            badge: 'SHIELD ACTIVE',
            badgeClass: 'pink',
            metrics: [
                'Jailbreak Success Rate (defense bypasses)',
                'Toxicity / Hate classification',
                'Refusal Recall (blocking unsafe requests)',
                'PII Leakage interception',
                'Drift frequency checks'
            ],
            diagnosis: 'SAFETY DIAGNOSIS: If Refusal Recall is low, safety settings are too relaxed, allowing prompt injections. If Refusal Precision is low, guardrails are over-sensitive, blocking benign queries.',
            evalRun: [
                { text: 'Deploying red-teaming payload sweep...', delay: 500, type: 'info' },
                { text: 'Injecting 500 adversarial jailbreak prompts...', delay: 900, type: 'info' },
                { text: 'Evaluating output filter sensitivity...', delay: 800, type: 'info' },
                { text: 'Measuring refusal rates on toxic inputs...', delay: 1000, type: 'info' },
                { text: 'Checking drift metrics against baseline...', delay: 700, type: 'info' },
                { text: 'Safety audit completed. Compiling scorecard.', delay: 500, type: 'success' }
            ],
            scores: [
                { name: 'Jailbreak Defense', val: '100%', target: '100%', fill: '100%' },
                { name: 'Refusal Recall', val: '99%', target: '>= 99%', fill: '99%' },
                { name: 'Refusal Precision', val: '93%', target: '>= 95%', fill: '93%', warning: true },
                { name: 'Toxicity Intercept', val: '100%', target: '100%', fill: '100%' },
                { name: 'Drift Rate', val: '0.2%', target: '< 1.0%', fill: '98%' }
            ]
        },
        multimodal: {
            title: 'Multimodal Vision Assistant',
            desc: 'Parsing layout structures in PDF slides, matching image content, and generating accurate textual descriptions.',
            badge: 'VISION ACTIVE',
            badgeClass: 'cyan',
            metrics: [
                'CLIPScore / VQA accuracy (image-text alignment)',
                'Object Hallucination / CHAIR',
                'Schema Validity (visual parser structures)',
                'Completeness of text extraction',
                'WER / CER (OCR errors)'
            ],
            diagnosis: 'VISION DIAGNOSIS: If CLIPScore is low, check if layout elements confuse the vision encoder. If Object Hallucination (CHAIR) is high, adjust decoding temperature downwards to anchor generation in pixels.',
            evalRun: [
                { text: 'Loading multimodal test deck (150 images & PDFs)...', delay: 500, type: 'info' },
                { text: 'Running visual question answering (VQA) logs...', delay: 900, type: 'info' },
                { text: 'Computing CLIPScore alignment indexes...', delay: 1000, type: 'info' },
                { text: 'Executing CHAIR object hallucination checks...', delay: 800, type: 'info' },
                { text: 'Measuring OCR error rates (WER/CER)...', delay: 1000, type: 'info' },
                { text: 'Visual telemetry audit complete.', delay: 500, type: 'success' }
            ],
            scores: [
                { name: 'CLIPScore', val: '88.5', target: '>= 85.0', fill: '88%' },
                { name: 'CHAIR Index', val: '2.1%', target: '< 3.0%', fill: '93%' },
                { name: 'Schema Validity', val: '99%', target: '>= 98%', fill: '99%' },
                { name: 'Completeness', val: '96%', target: '>= 95%', fill: '96%' },
                { name: 'OCR Word Error Rate', val: '1.8%', target: '< 2.0%', fill: '91%' }
            ]
        }
    };

    const simPickerBtns = document.querySelectorAll('.sim-picker-btn');
    const simProfileTitle = document.getElementById('sim-profile-title');
    const simProfileDesc = document.getElementById('sim-profile-desc');
    const simProfileBadge = document.getElementById('sim-profile-badge');
    const simMetricsList = document.getElementById('sim-metrics-list');
    const simDiagnosisBox = document.getElementById('sim-diagnosis-box');
    const btnRunSimEval = document.getElementById('btn-run-sim-eval');
    const simTerminalStatus = document.getElementById('sim-terminal-status');
    const simTerminalBody = document.getElementById('sim-terminal-body');
    const scorecardV4 = document.getElementById('scorecard-v4');
    const scoreGridV4 = document.getElementById('score-grid-v4');

    let currentSimProfile = 'rag';

    const loadSimProfile = (profileId) => {
        const profile = simProfiles[profileId];
        if (!profile) return;

        currentSimProfile = profileId;

        if (simProfileTitle) simProfileTitle.textContent = profile.title;
        if (simProfileDesc) simProfileDesc.textContent = profile.desc;
        
        if (simProfileBadge) {
            simProfileBadge.textContent = profile.badge;
            simProfileBadge.className = `status-badge ${profile.badgeClass}`;
            simProfileBadge.style.color = `var(--neon-${profile.badgeClass})`;
            simProfileBadge.style.borderColor = `var(--neon-${profile.badgeClass})`;
        }

        if (simMetricsList) {
            simMetricsList.innerHTML = '';
            profile.metrics.forEach(m => {
                const li = document.createElement('li');
                li.textContent = m;
                simMetricsList.appendChild(li);
            });
        }

        if (simDiagnosisBox) {
            simDiagnosisBox.textContent = profile.diagnosis;
            simDiagnosisBox.style.borderLeftColor = `var(--neon-${profile.badgeClass})`;
        }

        if (scorecardV4) scorecardV4.style.display = 'none';
        if (simTerminalStatus) {
            simTerminalStatus.textContent = '> STANDBY';
            simTerminalStatus.style.color = '#888';
        }
        if (simTerminalBody) {
            simTerminalBody.innerHTML = `<div class="terminal-line comment" style="color: #666;"># Profile calibrated: ${profile.title}. Ready for execution diagnostic.</div>`;
        }
        if (btnRunSimEval) {
            btnRunSimEval.disabled = false;
            btnRunSimEval.style.opacity = '1';
        }
    };

    simPickerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            simPickerBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const profileId = btn.getAttribute('data-profile');
            loadSimProfile(profileId);
        });
    });

    if (btnRunSimEval) {
        btnRunSimEval.addEventListener('click', () => {
            playClick();
            btnRunSimEval.disabled = true;
            btnRunSimEval.style.opacity = '0.5';
            
            if (simTerminalStatus) {
                simTerminalStatus.textContent = '> RUNNING';
                simTerminalStatus.style.color = 'var(--neon-cyan)';
            }
            if (simTerminalBody) {
                simTerminalBody.innerHTML = '';
            }
            if (scorecardV4) scorecardV4.style.display = 'none';

            const profile = simProfiles[currentSimProfile];
            let stepIndex = 0;

            const executeStep = () => {
                if (stepIndex < profile.evalRun.length) {
                    const step = profile.evalRun[stepIndex];
                    const line = document.createElement('div');
                    line.className = 'terminal-line';
                    
                    if (step.type === 'success') {
                        line.style.color = 'var(--neon-green)';
                        line.textContent = `> ${step.text}`;
                    } else if (step.type === 'warning') {
                        line.style.color = 'var(--neon-pink)';
                        line.textContent = `⚠️ ${step.text}`;
                    } else {
                        line.style.color = '#ccc';
                        line.textContent = `[EVAL] ${step.text}`;
                    }
                    
                    if (simTerminalBody) {
                        simTerminalBody.appendChild(line);
                        simTerminalBody.scrollTop = simTerminalBody.scrollHeight;
                    }

                    stepIndex++;
                    setTimeout(executeStep, step.delay);
                } else {
                    if (simTerminalStatus) {
                        simTerminalStatus.textContent = '> COMPLETED';
                        simTerminalStatus.style.color = 'var(--neon-green)';
                    }
                    
                    renderScorecard(profile.scores);
                    playSuccess();
                    
                    btnRunSimEval.disabled = false;
                    btnRunSimEval.style.opacity = '1';
                }
            };

            executeStep();
        });
    }

    const renderScorecard = (scores) => {
        if (!scoreGridV4 || !scorecardV4) return;
        scoreGridV4.innerHTML = '';
        
        scores.forEach(s => {
            const card = document.createElement('div');
            card.className = 'score-card-v4';
            
            const valColor = s.warning ? 'var(--neon-pink)' : 'var(--neon-cyan)';
            const barFillColor = s.warning ? 'var(--neon-pink)' : 'var(--neon-cyan)';
            
            card.innerHTML = `
                <h5>${s.name}</h5>
                <div class="score-val-row">
                    <span class="score-val" style="color: ${valColor};">${s.val}</span>
                    <span class="score-target">Target: ${s.target}</span>
                </div>
                <div class="score-bar-bg">
                    <div class="score-bar-fill" style="width: 0%; background-color: ${barFillColor};"></div>
                </div>
            `;
            
            scoreGridV4.appendChild(card);
            
            setTimeout(() => {
                const fill = card.querySelector('.score-bar-fill');
                if (fill) fill.style.width = s.fill;
            }, 100);
        });

        scorecardV4.style.display = 'block';
    };

    if (document.getElementById('chapter-v4-test-flight')) {
        loadSimProfile('rag');
    }

    // ==========================================================================
    // 12. COHORT KNOWLEDGE ARCHIVE (WEEK 3 GLOSSARY VAULT) DATA & LOGIC
    // ==========================================================================

    const glossaryDataV3 = {
        concepts: {
            title: 'Agent Concepts',
            subcategories: {
                'core-concepts': {
                    label: 'Core Concepts',
                    terms: [
                        { name: 'AI Agent (Agentic System)', definition: 'An autonomous system that receives data, makes rational decisions, and acts within its environment to achieve specific goals by determining its own next steps in a loop. Unlike static chatbots, agents iteratively plan, use tools, and self-correct.' },
                        { name: 'Workflow', definition: 'A system where LLMs and tools are orchestrated through predefined, hardcoded paths. Workflows offer predictability and consistency for well-defined tasks, whereas agents offer flexibility for open-ended ones.' },
                        { name: 'ReAct', definition: 'An approach that synergizes reasoning (e.g., chain-of-thought prompting) and acting (e.g., action plan generation) in an interleaved manner, enabling the agent to handle exceptions and track subtasks.' },
                        { name: 'Harness', definition: 'Refers to everything in an AI agent system except the underlying model itself (Agent = Model + Harness). Provides tools and loop control, using Guides (feedforward steering) and Sensors (feedback corrections).' },
                        { name: 'Human-in-the-Loop (HITL)', definition: 'Incorporating human oversight to inspect, modify, or approve an agent\'s state and actions. Essential for high-stakes, low-confidence, or irreversible tasks.' }
                    ]
                },
                'core-vocab': {
                    label: 'Core Vocabulary',
                    terms: [
                        { name: 'Agent', definition: 'A system that receives a goal, picks actions, observes results, and dynamically decides its next step in a loop until the goal is met or resources are exhausted.' },
                        { name: 'Chatbot', definition: 'A conversational system that answers one prompt and stops, without an iterative planner loop or dynamic tool execution.' },
                        { name: 'Action', definition: 'A single decision the agent makes during its turn, which is typically executing a tool call.' },
                        { name: 'Observation', definition: 'The result returned after an action is executed, providing new context for the agent\'s next reasoning turn.' },
                        { name: 'Planner', definition: 'The model\'s reasoning step where it decides what action to take next to progress toward the overall goal.' },
                        { name: 'Executor', definition: 'The underlying code or runtime that executes the planned action and returns the observation to the model.' },
                        { name: 'State', definition: 'A structured tracking object containing everything the agent currently knows, including task progress, history, and tool results.' }
                    ]
                }
            }
        },
        tools: {
            title: 'Tools & Connectivity',
            subcategories: {
                'tool-calling': {
                    label: 'Tool Calling',
                    terms: [
                        { name: 'Function Calling / Tool Calling', definition: 'The capability that provides models with a way to interface with external systems, run code, or access data outside their pretraining set.' },
                        { name: 'Client Tools', definition: 'Tools that run locally within your application infrastructure, requiring your code to execute the operation and return the result to the model.' },
                        { name: 'Server Tools', definition: 'Tools that execute directly on the model provider\'s server infrastructure (such as Anthropic\'s hosted web search or code execution environments).' }
                    ]
                },
                'protocols': {
                    label: 'Protocols & Frameworks',
                    terms: [
                        { name: 'Model Context Protocol (MCP)', definition: 'An open-source standard acting like a "USB-C port" for AI applications. Standardizes how Hosts connect to external Server data sources and tools.' },
                        { name: 'Agent2Agent (A2A) Protocol', definition: 'An open protocol enabling communication and interoperability between different, opaque agentic applications without exposing internal proprietary logic.' },
                        { name: 'MINT Framework', definition: 'Minimal Intelligence Necessary Tools. A design philosophy prioritizing starting with the simplest viable prompt before adding tools, state, or multi-agent orchestration.' },
                        { name: 'ADLC', definition: 'Agent Development Lifecycle. The continuous process for building reliable agents: Scope, Prototype, Build, Evaluate, Deploy, Monitor & Improve.' }
                    ]
                }
            }
        },
        patterns: {
            title: 'Design Patterns',
            subcategories: {
                'architectures': {
                    label: 'Architecture Patterns',
                    terms: [
                        { name: 'Prompt Chaining', definition: 'Breaking a task into a sequence of steps where each LLM call processes the output of the previous one, enhancing predictability.' },
                        { name: 'Routing', definition: 'Classifying an input and directing it to a specialized follow-up task, downstream process, or smaller model.' },
                        { name: 'Parallelization', definition: 'Having LLMs work simultaneously on subtasks. Includes Sectioning (independent tasks) and Voting (multiple runs for high-confidence agreement).' },
                        { name: 'Orchestrator-Workers (Supervisor)', definition: 'A centralized multi-agent pattern where a supervisor coordinator agent breaks down tasks, delegates to specialized workers, and synthesizes results.' },
                        { name: 'Evaluator-Optimizer (Critic-Reviewer)', definition: 'An iterative loop where one LLM generates a response, and another evaluates and critiques it until quality criteria are met.' }
                    ]
                },
                'pattern-details': {
                    label: 'Pattern Details',
                    terms: [
                        { name: 'Router Pattern', definition: 'An architecture where an initial classifier categorizes the user\'s request and dispatches it to the appropriate specialized tool or workflow.' },
                        { name: 'Planner-Executor', definition: 'A design that splits tasks by using an expensive model to plan, and smaller, cheaper models to execute each step.' },
                        { name: 'Supervisor Pattern', definition: 'A centralized multi-agent system where one coordinator routes work to various specialist agents and compiles outputs.' },
                        { name: 'Reflection Pattern', definition: 'A "draft, critique, revise" loop where a generator agent produces an output and a reflector agent critiques it.' }
                    ]
                }
            }
        },
        memory: {
            title: 'Memory & Operations',
            subcategories: {
                'memory-types': {
                    label: 'Memory Systems',
                    terms: [
                        { name: 'Working Memory', definition: 'Short-term, ephemeral memory that lives inside the current context window, storing active conversation history and tool results. Bounded by token limits.' },
                        { name: 'Session Memory', definition: 'Key-value state and structured objects that persist specifically for the duration of an ongoing conversation or task.' },
                        { name: 'Long-Term Memory', definition: 'Information that survives beyond a single session, stored persistently. Includes Semantic, Episodic, and Procedural memories.' }
                    ]
                },
                'memory-defs': {
                    label: 'Memory Definitions',
                    terms: [
                        { name: 'Semantic Memory', definition: 'Stable, atemporal facts, project knowledge, and user preferences stored persistently.' },
                        { name: 'Episodic Memory', definition: 'Specific, time-indexed events and past actions (e.g., "refund processed on May 24").' },
                        { name: 'Procedural Memory', definition: 'Learned workflows and "how-to" steps.' }
                    ]
                },
                'ops': {
                    label: 'Operations & Monitoring',
                    terms: [
                        { name: 'EDDOps', definition: 'Evaluation-Driven Development and Operations. A lifecycle approach unifying offline testing and online runtime monitoring.' },
                        { name: 'AgentOps', definition: 'The operational infrastructure for monitoring, logging, and tracing an agent\'s execution steps and tool invocations.' }
                    ]
                }
            }
        }
    };

    // 12.5. Cohort Knowledge Archive Interactions (Week 3)
    const pillarV3Buttons = document.querySelectorAll('.pillar-v3-btn');
    const subcategoriesV3Container = document.getElementById('archive-v3-subcategories');
    const consoleV3DefaultMsg = document.getElementById('console-v3-default-msg');
    const termV3DetailsView = document.getElementById('term-v3-details-view');
    const termV3Title = document.getElementById('term-v3-title');
    const termV3Badge = document.getElementById('term-v3-badge');
    const termV3Definition = document.getElementById('term-v3-definition');
    const termV3SubCategory = document.getElementById('term-v3-sub-category');
    const btnV3CopyDefinition = document.getElementById('btn-v3-copy-definition');
    const notesV3Section = document.getElementById('glossary-v3-notes-section');
    const notesV3ScrollList = document.getElementById('notes-v3-scroll-list');
    const searchV3Input = document.getElementById('archive-v3-search');

    let activeV3Pillar = 'concepts';
    let activeV3Subcategory = '';
    let selectedV3Term = null;

    const renderV3Subcategories = (pillarId) => {
        if (!subcategoriesV3Container) return;
        subcategoriesV3Container.innerHTML = '';
        const subcats = glossaryDataV3[pillarId].subcategories;
        
        Object.keys(subcats).forEach((subcatKey, idx) => {
            const subcat = subcats[subcatKey];
            const chip = document.createElement('button');
            chip.className = 'subcategory-chip';
            if (idx === 0) {
                chip.classList.add('active');
                activeV3Subcategory = subcatKey;
            }
            chip.textContent = subcat.label;
            chip.setAttribute('data-subcat', subcatKey);
            
            chip.addEventListener('click', () => {
                playClick();
                subcategoriesV3Container.querySelectorAll('.subcategory-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeV3Subcategory = subcatKey;
                if (searchV3Input) searchV3Input.value = '';
                renderV3TermsForCategory(pillarId, subcatKey);
            });
            
            subcategoriesV3Container.appendChild(chip);
        });

        if (activeV3Subcategory) {
            renderV3TermsForCategory(pillarId, activeV3Subcategory);
        }
    };

    const showV3TermDetails = (term, pillarName, subcategoryLabel) => {
        if (!term) return;
        selectedV3Term = term;
        if (consoleV3DefaultMsg) consoleV3DefaultMsg.style.display = 'none';
        if (termV3DetailsView) termV3DetailsView.style.display = 'flex';
        
        if (termV3Title) termV3Title.textContent = term.name;
        if (termV3Badge) termV3Badge.textContent = pillarName.toUpperCase();
        if (termV3Definition) termV3Definition.textContent = term.definition;
        if (termV3SubCategory) termV3SubCategory.textContent = `Subcategory: ${subcategoryLabel}`;
        
        if (btnV3CopyDefinition) {
            btnV3CopyDefinition.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                COPY TELEMETRY
            `;
            btnV3CopyDefinition.classList.remove('copied');
        }

        if (notesV3ScrollList) {
            notesV3ScrollList.querySelectorAll('.note-card').forEach(card => {
                const h5 = card.querySelector('h5');
                if (h5 && h5.textContent === term.name) {
                    card.classList.add('active-term');
                } else {
                    card.classList.remove('active-term');
                }
            });
        }
    };

    const renderV3TermsForCategory = (pillarId, subcatKey) => {
        if (!notesV3ScrollList || !notesV3Section) return;
        notesV3ScrollList.innerHTML = '';
        notesV3Section.style.display = 'flex';
        
        const pillar = glossaryDataV3[pillarId];
        const subcat = pillar.subcategories[subcatKey];
        const terms = subcat.terms;

        terms.forEach((term, idx) => {
            const card = document.createElement('div');
            card.className = 'note-card';
            if (idx === 0) {
                card.classList.add('active-term');
                showV3TermDetails(term, pillar.title, subcat.label);
            }

            card.innerHTML = `
                <h5>${term.name}</h5>
                <p>${term.definition.substring(0, 95)}...</p>
            `;

            card.addEventListener('click', () => {
                playClick();
                showV3TermDetails(term, pillar.title, subcat.label);
            });

            notesV3ScrollList.appendChild(card);
        });

        notesV3ScrollList.scrollTop = 0;
    };

    if (btnV3CopyDefinition) {
        btnV3CopyDefinition.addEventListener('click', () => {
            if (!selectedV3Term) return;
            navigator.clipboard.writeText(`${selectedV3Term.name}: ${selectedV3Term.definition}`).then(() => {
                playSuccess();
                btnV3CopyDefinition.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    COPIED SECURELY!
                `;
                btnV3CopyDefinition.classList.add('copied');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    if (searchV3Input) {
        searchV3Input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                subcategoriesV3Container.querySelectorAll('.subcategory-chip').forEach(c => {
                    if (c.classList.contains('active')) {
                        const subcatKey = c.getAttribute('data-subcat');
                        renderV3TermsForCategory(activeV3Pillar, subcatKey);
                    }
                });
                return;
            }

            const results = [];
            Object.keys(glossaryDataV3).forEach(pillarKey => {
                const pillar = glossaryDataV3[pillarKey];
                Object.keys(pillar.subcategories).forEach(subcatKey => {
                    const subcat = pillar.subcategories[subcatKey];
                    subcat.terms.forEach(term => {
                        if (term.name.toLowerCase().includes(query) || term.definition.toLowerCase().includes(query)) {
                            results.push({
                                term,
                                pillarTitle: pillar.title,
                                subcatLabel: subcat.label
                            });
                        }
                    });
                });
            });

            if (!notesV3ScrollList) return;
            notesV3ScrollList.innerHTML = '';
            subcategoriesV3Container.querySelectorAll('.subcategory-chip').forEach(c => c.classList.remove('active'));

            if (results.length === 0) {
                notesV3ScrollList.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary); font-family: monospace;">
                        <p>> NO CORRESPONDING TELEMETRY FOUND FOR "${query.toUpperCase()}"</p>
                    </div>
                `;
                if (consoleV3DefaultMsg) consoleV3DefaultMsg.style.display = 'flex';
                if (termV3DetailsView) termV3DetailsView.style.display = 'none';
                return;
            }

            results.forEach((res, idx) => {
                const card = document.createElement('div');
                card.className = 'note-card';
                if (idx === 0) {
                    card.classList.add('active-term');
                    showV3TermDetails(res.term, res.pillarTitle, res.subcatLabel);
                }

                card.innerHTML = `
                    <h5>${res.term.name}</h5>
                    <span style="font-size: 0.75rem; color: var(--neon-purple); display: block; margin-bottom: 0.2rem; font-family: var(--font-heading);">${res.subcatLabel}</span>
                    <p>${res.term.definition.substring(0, 95)}...</p>
                `;

                card.addEventListener('click', () => {
                    playClick();
                    showV3TermDetails(res.term, res.pillarTitle, res.subcatLabel);
                });

                notesV3ScrollList.appendChild(card);
            });

            notesV3ScrollList.scrollTop = 0;
        });
    }

    pillarV3Buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            pillarV3Buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeV3Pillar = btn.getAttribute('data-pillar');
            if (searchV3Input) searchV3Input.value = '';
            renderV3Subcategories(activeV3Pillar);
        });
    });

    if (document.getElementById('chapter-v3-knowledge-archive')) {
        renderV3Subcategories('concepts');
    }

    // ==========================================================================
    // 13. VOYAGE 3 SIMULATOR INTERACTION LOGIC
    // ==========================================================================

    const simV3Profiles = {
        react: {
            title: 'ReAct Reasoning Loop',
            desc: 'Interleaving Reasoning (thought) and Acting (actions/tool calls) to dynamically solve tasks step-by-step.',
            badge: 'REACT ACTIVE',
            badgeClass: 'cyan',
            characteristics: [
                'Interleaves thoughts, actions, and observations',
                'Allows dynamic trajectory self-correction',
                'Integrates external environment context live',
                'Best for open-ended, single-agent challenges'
            ],
            goal: 'Locate Sector V3 active database coordinates and write to telemetry.',
            steps: [
                { text: 'Initialising ReAct controller...', delay: 500, type: 'info', stepsCount: '0 / 4', action: 'STARTUP' },
                { text: 'THOUGHT: I need to check the local flight database to find coordinates for the active V3 sector. Let me call find_coordinates().', delay: 1000, type: 'thought', stepsCount: '1 / 4', action: 'THINKING' },
                { text: 'ACTION: Invoking tool \'find_coordinates\' with sector="V3"', delay: 800, type: 'action', stepsCount: '1 / 4', action: 'TOOL_CALL: find_coordinates' },
                { text: 'OBSERVATION: Coordinates retrieved: [V3-Orion Nebula, Lat: 42.1, Lng: -71.5]', delay: 800, type: 'obs', stepsCount: '2 / 4', action: 'OBSERVE: find_coordinates' },
                { text: 'THOUGHT: Excellent, the coordinates are [42.1, -71.5]. Now I must write these coordinates to the flight log. Let me call write_flight_log().', delay: 1000, type: 'thought', stepsCount: '2 / 4', action: 'THINKING' },
                { text: 'ACTION: Invoking tool \'write_flight_log\' with Sector="V3-Orion Nebula", Lat=42.1, Lng=-71.5', delay: 800, type: 'action', stepsCount: '3 / 4', action: 'TOOL_CALL: write_flight_log' },
                { text: 'OBSERVATION: Telemetry database committed. Flight log updated successfully.', delay: 800, type: 'obs', stepsCount: '3 / 4', action: 'OBSERVE: write_flight_log' },
                { text: 'THOUGHT: The task is successfully finished. I will return the confirmation statement.', delay: 800, type: 'thought', stepsCount: '4 / 4', action: 'THINKING' },
                { text: 'FINAL ANSWER: Flight log successfully calibrated with Sector V3-Orion Nebula coordinates [42.1, -71.5]. Goal achieved.', delay: 500, type: 'success', stepsCount: '4 / 4', action: 'COMPLETED' }
            ]
        },
        supervisor: {
            title: 'Supervisor & Workers',
            desc: 'A centralized multi-agent hierarchy where a supervisor coordinator delegates subtasks to specialized worker agents.',
            badge: 'SUPERVISOR ACTIVE',
            badgeClass: 'green',
            metrics: [],
            characteristics: [
                'Centralized agent orchestration and routing',
                'Divides a complex goal into specialized domains',
                'Workers communicate only with the Supervisor',
                'Supervisor reviews outputs and compiles final result'
            ],
            goal: 'Fetch Raw V3 metrics, compile report, and verify schema.',
            steps: [
                { text: 'Initialising Multi-Agent Supervisor...', delay: 500, type: 'info', stepsCount: '0 / 3', action: 'STARTUP' },
                { text: 'SUPERVISOR THOUGHT: Goal requires raw metrics collection followed by report compilation. I will dispatch the Research Worker first.', delay: 900, type: 'thought', stepsCount: '1 / 3', action: 'THINKING' },
                { text: 'SUPERVISOR ACTION: Routing task "Fetch Raw V3 metrics" to RESEARCH_WORKER...', delay: 700, type: 'action', stepsCount: '1 / 3', action: 'DELEGATE: RESEARCH_WORKER' },
                { text: 'RESEARCH_WORKER: Executing db query on sector V3 telemetry databases...', delay: 800, type: 'info', stepsCount: '1 / 3', action: 'RESEARCHING' },
                { text: 'RESEARCH_WORKER OBS: Telemetry found: velocity=28,000km/h, fuel=84%, orbit_stability=1.0', delay: 700, type: 'obs', stepsCount: '1 / 3', action: 'REPLY: RESEARCH_WORKER' },
                { text: 'SUPERVISOR THOUGHT: Metrics fetched. Now I will dispatch the Writer Worker to compile these into a formal report.', delay: 900, type: 'thought', stepsCount: '2 / 3', action: 'THINKING' },
                { text: 'SUPERVISOR ACTION: Routing task "Compile metrics into markdown report" to WRITER_WORKER...', delay: 700, type: 'action', stepsCount: '2 / 3', action: 'DELEGATE: WRITER_WORKER' },
                { text: 'WRITER_WORKER: Structuring report: Heading, Stats table, status summary...', delay: 900, type: 'info', stepsCount: '2 / 3', action: 'COMPILING' },
                { text: 'WRITER_WORKER OBS: Manifest markdown compiled. Details: Orbit stable, velocity verified.', delay: 700, type: 'obs', stepsCount: '2 / 3', action: 'REPLY: WRITER_WORKER' },
                { text: 'SUPERVISOR THOUGHT: Subtasks finished. Formulating final answer report.', delay: 800, type: 'thought', stepsCount: '3 / 3', action: 'THINKING' },
                { text: 'FINAL ANSWER: V3 Telemetry Report compiled: 28k km/h velocity, 84% fuel, orbit stability 1.0. Worker files stored.', delay: 500, type: 'success', stepsCount: '3 / 3', action: 'COMPLETED' }
            ]
        },
        reflection: {
            title: 'Reflection (Critic-Gen)',
            desc: 'A "draft, critique, revise" pipeline where a generator produces a draft and a reflector critiques it iteratively.',
            badge: 'REFLECTION ACTIVE',
            badgeClass: 'purple',
            metrics: [],
            characteristics: [
                'Self-correcting iterative refinement loops',
                'Validator agent acts as strict safety/schema critic',
                'Generator adjusts drafts based on detailed critique',
                'Minimizes hallucinations and syntax errors'
            ],
            goal: 'Generate valid JSON file containing Sector V3 parameters.',
            steps: [
                { text: 'Initialising Generator and Reflector pair...', delay: 500, type: 'info', stepsCount: '0 / 3', action: 'STARTUP' },
                { text: 'GENERATOR: Drafting telemetry manifest parameters in JSON format...', delay: 900, type: 'info', stepsCount: '1 / 3', action: 'DRAFTING' },
                { text: 'GENERATOR DRAFT: { "sector": "V3", coordinates: [42.1, -71.5] }', delay: 700, type: 'thought', stepsCount: '1 / 3', action: 'OUTPUT_DRAFT' },
                { text: 'REFLECTOR ACTION: Auditing draft against schema constraints...', delay: 800, type: 'action', stepsCount: '1 / 3', action: 'CRITIQUING' },
                { text: 'REFLECTOR CRITIQUE: Target format invalid. Key "coordinates" is missing double quotes, violating strict JSON parsing. Please correct coordinates syntax.', delay: 1000, type: 'warning', stepsCount: '1 / 3', action: 'REFUSE_DRAFT' },
                { text: 'GENERATOR: Processing critic feedback. Fixing coordinates key formatting...', delay: 800, type: 'info', stepsCount: '2 / 3', action: 'REVISING' },
                { text: 'GENERATOR DRAFT REVISED: { "sector": "V3", "coordinates": [42.1, -71.5] }', delay: 700, type: 'thought', stepsCount: '2 / 3', action: 'OUTPUT_REVISED' },
                { text: 'REFLECTOR ACTION: Re-auditing revised draft...', delay: 800, type: 'action', stepsCount: '2 / 3', action: 'CRITIQUING' },
                { text: 'REFLECTOR CRITIQUE: JSON schema parsed successfully. Metrics conform. Draft approved.', delay: 800, type: 'success', stepsCount: '2 / 3', action: 'APPROVE_DRAFT' },
                { text: 'FINAL ANSWER: Valid JSON manifest generated and approved: { "sector": "V3", "coordinates": [42.1, -71.5] }', delay: 500, type: 'success', stepsCount: '3 / 3', action: 'COMPLETED' }
            ]
        }
    };

    const pickerV3Btns = document.querySelectorAll('#chapter-v3-test-flight .sim-picker-btn');
    const titleV3 = document.getElementById('sim-pattern-title');
    const descV3 = document.getElementById('sim-pattern-desc');
    const badgeV3 = document.getElementById('sim-pattern-badge');
    const characteristicsListV3 = document.getElementById('sim-pattern-characteristics');
    
    const statusV3 = document.getElementById('sim-v3-status');
    const bodyV3 = document.getElementById('sim-v3-body');
    const btnRunV3 = document.getElementById('btn-run-sim-v3');

    const telGoal = document.getElementById('tel-goal');
    const telStep = document.getElementById('tel-step');
    const telAction = document.getElementById('tel-action');
    const telObs = document.getElementById('tel-obs');

    let currentV3Pattern = 'react';

    const loadV3Pattern = (patternId) => {
        const pattern = simV3Profiles[patternId];
        if (!pattern) return;

        currentV3Pattern = patternId;

        if (titleV3) titleV3.textContent = pattern.title;
        if (descV3) descV3.textContent = pattern.desc;

        if (badgeV3) {
            badgeV3.textContent = pattern.badge;
            badgeV3.className = `status-badge ${pattern.badgeClass}`;
            badgeV3.style.color = `var(--neon-${pattern.badgeClass})`;
            badgeV3.style.borderColor = `var(--neon-${pattern.badgeClass})`;
        }

        if (characteristicsListV3) {
            characteristicsListV3.innerHTML = '';
            pattern.characteristics.forEach(c => {
                const li = document.createElement('li');
                li.textContent = c;
                characteristicsListV3.appendChild(li);
            });
        }

        if (telGoal) telGoal.textContent = pattern.goal;
        if (telStep) telStep.textContent = '0 / 0';
        if (telAction) {
            telAction.textContent = 'NONE';
            telAction.style.color = '#888';
        }
        if (telObs) {
            telObs.textContent = 'NONE';
            telObs.style.color = '#888';
        }

        if (statusV3) {
            statusV3.textContent = '> STANDBY';
            statusV3.style.color = '#888';
        }
        if (bodyV3) {
            bodyV3.innerHTML = `<div class="terminal-line comment" style="color: #666;"># Pattern loaded: ${pattern.title}. Click Run Agentic Loop to simulate.</div>`;
        }

        if (btnRunV3) {
            btnRunV3.disabled = false;
            btnRunV3.style.opacity = '1';
        }
    };

    pickerV3Btns.forEach(btn => {
        btn.addEventListener('click', () => {
            playClick();
            pickerV3Btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const patternId = btn.getAttribute('data-pattern');
            loadV3Pattern(patternId);
        });
    });

    if (btnRunV3) {
        btnRunV3.addEventListener('click', () => {
            playClick();
            btnRunV3.disabled = true;
            btnRunV3.style.opacity = '0.5';

            if (statusV3) {
                statusV3.textContent = '> RUNNING';
                statusV3.style.color = 'var(--neon-cyan)';
            }
            if (bodyV3) {
                bodyV3.innerHTML = '';
            }

            const pattern = simV3Profiles[currentV3Pattern];
            let stepIdx = 0;

            const runStep = () => {
                if (stepIdx < pattern.steps.length) {
                    const step = pattern.steps[stepIdx];
                    const line = document.createElement('div');
                    line.className = 'terminal-line';

                    // Styling categories
                    if (step.type === 'thought') {
                        line.style.color = 'var(--neon-purple)';
                        line.textContent = `[THOUGHT] ${step.text}`;
                    } else if (step.type === 'action') {
                        line.style.color = 'var(--neon-pink)';
                        line.textContent = `[ACTION] ${step.text}`;
                    } else if (step.type === 'obs') {
                        line.style.color = 'var(--neon-cyan)';
                        line.textContent = `[OBSERVATION] ${step.text}`;
                    } else if (step.type === 'success') {
                        line.style.color = 'var(--neon-green)';
                        line.textContent = `[SUCCESS] ${step.text}`;
                    } else if (step.type === 'warning') {
                        line.style.color = 'var(--neon-pink)';
                        line.textContent = `[WARNING] ${step.text}`;
                    } else {
                        line.style.color = '#ccc';
                        line.textContent = step.text;
                    }

                    if (bodyV3) {
                        bodyV3.appendChild(line);
                        bodyV3.scrollTop = bodyV3.scrollHeight;
                    }

                    // Update state trackers
                    if (telStep) telStep.textContent = step.stepsCount;
                    if (telAction) {
                        telAction.textContent = step.action;
                        if (step.type === 'thought') telAction.style.color = 'var(--neon-purple)';
                        else if (step.type === 'action') telAction.style.color = 'var(--neon-pink)';
                        else if (step.type === 'success') telAction.style.color = 'var(--neon-green)';
                        else telAction.style.color = '#ccc';
                    }
                    if (telObs) {
                        if (step.type === 'obs') {
                            telObs.textContent = step.text.replace('[OBSERVATION] ', '').substring(0, 30) + '...';
                            telObs.style.color = 'var(--neon-cyan)';
                        }
                    }

                    stepIdx++;
                    setTimeout(runStep, step.delay);
                } else {
                    if (statusV3) {
                        statusV3.textContent = '> COMPLETED';
                        statusV3.style.color = 'var(--neon-green)';
                    }
                    playSuccess();
                    btnRunV3.disabled = false;
                    btnRunV3.style.opacity = '1';
                }
            };

            runStep();
        });
    }

    if (document.getElementById('chapter-v3-test-flight')) {
        loadV3Pattern('react');
    }
});

