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
            
            if (selectedVoyage === '1' || selectedVoyage === '2') {
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
});

